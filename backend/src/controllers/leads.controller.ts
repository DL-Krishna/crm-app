import { Request, Response } from 'express';
import { Op } from 'sequelize';
import xlsx from 'xlsx';

import Lead, { LeadAttributes } from '../models/lead.model';
import User from '../models/user.model';
import { leadSchema } from '../schemas/lead.schema';
import Course from '../models/course.model';
import Task from '../models/task.model';
import Call from '../models/call.model';
import Email from '../models/email.model';
import Meeting from '../models/meeting.model';
import Message from '../models/message.model';

export const getLeads = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Extract query parameters
        const { userId, fromDate, toDate, techStack, leadSource, courseId, leadStage } = req.query;

        // Prepare filter object based on provided query parameters
        const filter: any = {};
        if (userId) {
            filter.userId = userId;
        }
        if (fromDate && toDate) {
            const parsedFromDate = new Date(Date.parse(fromDate as string));
            const parsedToDate = new Date(Date.parse(toDate as string));
            filter.createdAt = {
                [Op.between]: [parsedFromDate, parsedToDate]
            };
        }
        if (techStack) {
            filter.techStack = techStack;
        }
        if (leadSource) {
            filter.leadSource = leadSource;
        }
        if (courseId) {
            filter.courseId = courseId;
        }

        if (leadStage) {
            filter.leadStage = leadStage;
        }

        // Fetch all leads from the database with optional filtering
        const leads = await Lead.findAll({
            where: filter,
            include: [
                {
                    model: User,
                    as: 'createdBy',
                    attributes: ['name', 'email']
                },
                {
                    model: Course,
                    as: 'courseDetails',
                    attributes: ['name', 'description', 'imgSrc']
                }]
        });

        // Return the leads in the response
        return res.status(200).json({
            leads
        });
    } catch (error) {
        // Handle errors, log them, and return an internal server error response
        console.error('Error fetching leads:', error);
        return res.status(500).json('Internal Server error');
    }
};

export const getLeadById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);

    try {
        // Find the lead by ID
        const lead = await Lead.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'createdBy',
                    attributes: ['name', 'email']
                },
                {
                    model: Course,
                    as: 'courseDetails',
                    attributes: ['name', 'description', 'imgSrc']
                }
            ]
        });

        // If lead is not found, return 404 Not Found
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        // Return the lead in the response
        return res.status(200).json(lead);
    } catch (error) {
        // Handle errors, log them, and return an internal server error response
        console.error('Error fetching lead by Id:', error);
        return res.status(500).json('Internal Server error');
    }
};

export const createLead = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Validate request body against Joi schema
        // const { error } = leadSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        Lead.sync({ alter: true })

        // Check if the username already exists
		const existingUser = await Lead.findOne({ where: { phone: req.body.phone } });
		if (existingUser) {
			// Username already exists, return error response
			return res.status(400).json({ error: 'Phone no already exists' });
		}

        // Create lead in the database
        const newLead = await Lead.create(req.body);

        // Return success response
        return res.status(201).json({
            message: 'Lead created successfully',
            data: newLead
        });
    } catch (error: any) {
        console.error('Error creating lead:', error);
        // Return error response
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateLead = async (req: Request, res: Response): Promise<Response> => {
    try {

        // Validate request body against Joi schema
        // const { error } = leadSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json({ message: error.details[0].message });
        // }

        // Extract lead ID from request parameters
        const id = parseInt(req.params.id);

        // Extract updated lead details from request body
        const { name, leadSource, countryCode, techStack, phone, courseId, email, classMode, feeQuoted, batchTiming, userId, description, nextFollowUp, leadStatus, leadStage } = req.body;


        // Find the lead by ID
        const lead = await Lead.findByPk(id);

        // If lead is not found, return 404 Not Found
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        // Update lead attributes
        lead.name = name;
        lead.leadSource = leadSource;
        lead.countryCode = countryCode;
        lead.techStack = techStack;
        lead.phone = phone;
        lead.courseId = courseId;
        lead.email = email;
        lead.classMode = classMode;
        lead.feeQuoted = feeQuoted;
        lead.batchTiming = batchTiming;
        lead.userId = userId;
        lead.description = description;
        lead.nextFollowUp = nextFollowUp;
        lead.leadStatus = leadStatus;
        lead.leadStage = leadStage;

        // Save the changes to the database
        await lead.save();

        // Return a JSON response with the updated lead details
        return res.json({
            message: 'Lead updated successfully',
            lead: {
                id,
                name,
                leadSource,
                countryCode,
                techStack,
                phone,
                courseId,
                email,
                classMode,
                feeQuoted,
                batchTiming,
                userId,
                description,
                nextFollowUp,
                leadStatus,
                leadStage
            },
        });
    } catch (error) {
        // Handle errors, log them, and return an internal server error response
        console.error('Error updating lead:', error);
        return res.status(500).json('Internal Server error');
    }
};

// Delete a lead by ID
export const deleteLead = async (req: Request, res: Response): Promise<Response> => {
    // Extract lead ID from request parameters
    const id = parseInt(req.params.id);

    try {
        // Find the lead by ID
        const lead = await Lead.findByPk(id);

        // If lead is not found, return 404 Not Found
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        await Task.destroy({ where: { leadId: id } });
        await Call.destroy({ where: { leadId: id } });
        await Email.destroy({ where: { leadId: id } });
        await Meeting.destroy({ where: { leadId: id } });
        await Message.destroy({ where: { leadId: id } });

        // Delete the lead from the database
        await lead.destroy();

        // Return a JSON response indicating successful deletion
        return res.status(200).json({ message: `Lead deleted successfully` });
    } catch (error: any) {
        // Handle errors, log them, and return an internal server error response
        console.error('Error deleting lead:', error);
        return res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
};

export const deleteLeads = async (req: Request, res: Response) => {
    const idsString = req.query.ids as string;
    const ids = idsString.split(',').map(id => parseInt(id, 10));
    try {
        await Promise.all(ids.map(async id => {
            await Task.destroy({ where: { leadId: id } });
            await Call.destroy({ where: { leadId: id } });
            await Email.destroy({ where: { leadId: id } });
            await Meeting.destroy({ where: { leadId: id } });
            await Message.destroy({ where: { leadId: id } });
        }));     

        const deletedRowCount = await Lead.destroy({ where: { id: { [Op.in]: ids } } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Leads not found' });
        }
        res.status(200).json({ message: 'Leads deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting contacts:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const processExcelData = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Extract the uploaded Excel file from the request
        const excelFile = req.file;
        if (!excelFile) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Load the Excel workbook
        const workbook = xlsx.readFile(excelFile.path);

        // Get the first worksheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Extract data from the worksheet
        const leadsData: LeadAttributes[] = xlsx.utils.sheet_to_json(worksheet);

        // Validate and process each row of data
        for (let i = 0; i < leadsData.length; i++) {
            const lead = leadsData[i];
            lead.phone = lead.phone.toString();

            // Validate the lead data
            const validationResult = leadSchema.validate(lead, { abortEarly: false });
            if (validationResult.error) {
                return res.status(400).json({ error: `Validation error in row ${i + 1}: ${validationResult.error.details.map(detail => detail.message).join('; ')}` });
            }
        }

        // Insert validated lead data into the database
        await Lead.bulkCreate(leadsData);

        // Return success response
        return res.status(200).json({ message: 'Leads inserted successfully' });
    } catch (error: any) {
        console.error('Error processing Excel data:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};