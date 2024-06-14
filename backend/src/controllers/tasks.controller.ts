import { Request, Response } from 'express';
import Task from '../models/task.model';
import User from '../models/user.model';
import Lead from '../models/lead.model';
import Course from '../models/course.model';

// Create a new task
export const createTask = async (req: Request, res: Response): Promise<Response> => {
    const { subject, dueDate, priority, userId, leadId } = req.body;

    try {
        // Ensure the Task table exists
        await Task.sync({ alter: true });

        // Create the task with leadId
        const newTask = await Task.create({
            subject,
            dueDate,
            priority,
            userId,
            leadId,
        });

        return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error: any) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const tasks = await Task.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['name', 'email', 'mobile']
            },
            {
                model: Lead,
                as: 'lead',
                attributes: ['name', 'techStack', 'phone', 'courseId', 'email'],
                include: [
                    {
                        model: Course,
                        as: 'courseDetails',
                        attributes: ['name']
                    }
                ]
            },]
        });
        return res.status(200).json({ tasks });
    } catch (error: any) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get task by ID
export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        const task = await Task.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email', 'mobile']
                },
                {
                    model: Lead,
                    as: 'lead',
                    attributes: ['name', 'techStack', 'phone', 'courseId', 'email'],
                    include: [
                        {
                            model: Course,
                            as: 'courseDetails',
                            attributes: ['name']
                        }
                    ]
                },
            ]
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ task });
    } catch (error: any) {
        console.error('Error fetching task by ID:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get tasks by lead ID
export const getTasksByDealerId = async (req: Request, res: Response): Promise<Response> => {
    const leadId = parseInt(req.params.leadId);
    try {
        const tasks = await Task.findAll({
            where: { leadId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email', 'mobile']
                },
                {
                    model: Lead,
                    as: 'lead',
                    attributes: ['name', 'techStack', 'phone', 'courseId', 'email'],
                    include: [
                        {
                            model: Course,
                            as: 'courseDetails',
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });
        return res.status(200).json({ tasks });
    } catch (error: any) {
        console.error('Error fetching tasks by lead ID:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get tasks by user id
export const getTasksByUserId = async (req: Request, res: Response): Promise<Response> => {
    const userId = parseInt(req.params.userId);
    try {
        const tasks = await Task.findAll({
            where: { userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email', 'mobile']
                },
                {
                    model: Lead,
                    as: 'lead',
                    attributes: ['name', 'techStack', 'phone', 'courseId', 'email'],
                    include: [
                        {
                            model: Course,
                            as: 'courseDetails',
                            attributes: ['name']
                        }
                    ]
                },
            ]
        });
        return res.status(200).json({ tasks });
    } catch (error: any) {
        console.error('Error fetching tasks by lead ID:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update a task
export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { subject, dueDate, priority, userId, leadId } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.subject = subject;
        task.dueDate = dueDate;
        task.priority = priority;
        task.userId = userId;
        task.leadId = leadId;
        await task.save();

        return res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error: any) {
        console.error('Error updating task:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};