import Message from '../models/message.model';
import { Request, Response } from 'express';
import Lead from '../models/lead.model';
import User from '../models/user.model';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACe0a703c6f216ea4ca203480643e3a8af';
const authToken = process.env.TWILIO_ACCOUNT_TOKEN || 'f272e2df4de81517da81a931b443057c';
const client = twilio(accountSid, authToken);

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { phoneNumber, messageContent, leadId, userId, type } = req.body;

        let messageSid;

        if (type === 'whatsapp') {
            // Send WhatsApp message using Twilio
            const message = await client.messages.create({
                body: messageContent,
                from: '+12513513799',
                to: `whatsapp:${phoneNumber}`
            });

            messageSid = message.sid;
        } else {
            // Send SMS message using Twilio
            const message = await client.messages.create({
                body: messageContent,
                from: '+12513513799',
                to: phoneNumber
            });

            messageSid = message.sid;
        }

        Message.sync({ alter: true });

        // Create a new message record in the database
        const newMessage = await Message.create({
            phoneNumber,
            messageId: messageSid,
            messageContent,
            leadId,
            userId,
            type,
        });

        res.status(200).json({ message: 'Message sent successfully.', newMessage });
    } catch (error: any) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message.', errorMessage: error.message });
    }
};

export const getAllMessages = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Extract optional parameters from the query string
        const { type, leadId } = req.query;

        // Define options for including lead and user details
        const leadOptions = {
            model: Lead,
            as: 'lead',
            attributes: ['name', 'techStack', 'phone', 'email'],
        };

        const userOptions = {
            model: User,
            as: 'createdBy',
            attributes: ['id', 'name', 'email', 'mobile'],
        };

        // Construct filter conditions based on optional parameters
        const filterConditions: any = {};

        if (type) {
            filterConditions.type = type;
        }

        if (leadId) {
            filterConditions.leadId = leadId;
        }

        // Fetch all messages with associated lead and user details, applying optional filters
        const messages = await Message.findAll({
            include: [
                leadOptions,
                userOptions
            ],
            where: filterConditions,
        });

        return res.status(200).json({ messages });
    } catch (error: any) {
        console.error('Error fetching messages:', error.toString());
        return res.status(500).json({ message: 'Error fetching messages.', error: error.message });
    }
};