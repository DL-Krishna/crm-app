import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import Email from '../models/email.model';
import Lead from '../models/lead.model';
import User from '../models/user.model';

const sendGridApiKey = process.env.TWILIO_API_KEY || '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';
sgMail.setApiKey(sendGridApiKey);

// Define the type for the email request body
interface EmailRequest {
    to: string[];
    bcc?: string[];
    from: string;
    subject: string;
    body: string;
    userId: number;
    leadId: number;
}

// Controller function to send emails
export const sendEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract email details from the request body
        const { to, bcc, from, subject, body, userId, leadId }: EmailRequest = req.body;

        // Create email options
        const msg = {
            to,
            bcc,
            from,
            subject,
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    .email-details {
                        background-color: #fff;
                        border-radius: 5px;
                        padding: 10px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                </style>
            </head>
            <body>
                <div class="email-details">
                    <p>Greetings of the day!</p><br>
                    <p>${body}</p>
                </div>
            </body>
            </html>
        `
        };

        // Send email using SendGrid
        await sgMail.send(msg);

        // Synchronize the database schema
        await Email.sync({ alter: true });

        // Insert record to the database
        await Email.create({
            to,
            bcc,
            from,
            subject,
            body,
            leadId,
            userId
        });

        // Respond with success message
        res.status(200).json({ message: 'Email sent successfully and record inserted to the database.' });
    } catch (error: any) {
        // Handle errors
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email.', message: error.message });
    }
};

export const getAllEmails = async (req: Request, res: Response): Promise<void> => {
    try {
        // Retrieve all emails with associated lead details from the database
        const emails = await Email.findAll({
            include: [
                {
                    model: Lead,
                    as: 'lead',
                    attributes: ['name', 'techStack', 'phone', 'email']
                },
                {
                    model: User,
                    as: 'createdBy',
                    attributes: ['id', 'name', 'email', 'mobile']
                },
            ]
        });

        // Respond with the list of emails including lead details
        res.status(200).json({ emails });
    } catch (error: any) {
        // Handle errors
        console.error('Error retrieving emails:', error);
        res.status(500).json({ error: 'Error retrieving emails.', message: error.message  });
    }
};

export const getEmailsByLeadId = async (req: Request, res: Response): Promise<void> => {
    const leadId = parseInt(req.params.leadId);
    try {
        // Retrieve emails by lead ID with associated lead details from the database
        const emails = await Email.findAll({
            where: { leadId },
            include: [
                {
                    model: Lead,
                    as: 'lead',
                    attributes: ['name', 'techStack', 'phone', 'email']
                },
                {
                    model: User,
                    as: 'createdBy',
                    attributes: ['id', 'name', 'email', 'mobile']
                },
            ]
        });

        // Respond with the list of emails including lead details
        res.status(200).json({ emails });
    } catch (error: any) {
        // Handle errors
        console.error('Error retrieving emails by lead ID:', error);
        res.status(500).json({ error: 'Error retrieving emails by lead ID.', message: error.message });
    }
};