import sgMail from '@sendgrid/mail';
import { Request, Response } from 'express';
import User from '../models/user.model';
import Meeting from '../models/meeting.model';
import Lead from '../models/lead.model';

const sendGridApiKey = process.env.TWILIO_API_KEY || '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';
sgMail.setApiKey(sendGridApiKey);

export const sendEmails = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { hostId, participants, meetingName, location, startTime, endTime, leadId, userId } = req.body;

        // Fetch host details
        const host: any = await User.findByPk(hostId);
        const hostEmail = host.email;

        const formattedStartTime = new Date(startTime).toLocaleString('en-GB', { timeZone: 'UTC' });
        const formattedEndTime = new Date(endTime).toLocaleString('en-GB', { timeZone: 'UTC' });

        // Compose email content
        const subject = `Meeting Invitation: ${meetingName}`;

        const html = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    h2 {
                        color: #007bff;
                    }
                    .meeting-details {
                        background-color: #fff;
                        border-radius: 5px;
                        padding: 10px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    .meeting-details strong {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="meeting-details">
                    <p>You have been invited to a meeting.</p>
                    <p><strong>Meeting Name:</strong> ${meetingName}</p>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Start Time:</strong> ${formattedStartTime}</p>
                    <p><strong>End Time:</strong> ${formattedEndTime}</p>
                </div>
            </body>
            </html>
        `;

        // Send emails
        await sgMail.send({
            to: [hostEmail, ...participants],
            from: 'kona@digital-edify.com',
            subject: subject,
            html: html
        });

        // Ensure the Meeting table exists
        await Meeting.sync({ alter: true });

        // Create the meeting
        await Meeting.create({
            hostId,
            participants,
            meetingName,
            location,
            startTime,
            endTime,
            leadId,
            userId
        });

        return res.status(200).json({ message: 'Emails sent successfully and meeting details stored.' });
    } catch (error: any) {
        console.error('Error occurred while sending emails:', error.toString());
        return res.status(500).json({ message: 'Error occurred while sending emails.', error: error.message });
    }
}

export const getAllMeetings = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Fetch all meetings including associated host and participants
        const meetings = await Meeting.findAll({
            include: [
                {
                    model: User,
                    as: 'host',
                    attributes: ['id', 'name', 'email', 'mobile']
                },
                {
                    model: User,
                    as: 'createdBy',
                    attributes: ['id', 'name', 'email', 'mobile']
                },
            ]
        });

        return res.status(200).json({ meetings });
    } catch (error: any) {
        console.error('Error occurred while fetching meetings:', error.toString());
        return res.status(500).json({ message: 'Error occurred while fetching meetings.' });
    }
}

export const getMeetingsByLeadId = async (req: Request, res: Response): Promise<Response> => {
    const leadId = parseInt(req.params.leadId);
    try {
        const meetings = await Meeting.findAll({
            where: { leadId },
            include: [
                {
                    model: Lead,
                    as: 'lead',
                    attributes: ['name', 'techStack', 'phone', 'email'] // Specify the lead attributes you want to retrieve
                }
            ]
        });
        return res.status(200).json({ meetings });
    } catch (error: any) {
        console.error('Error fetching meetings by lead ID:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};