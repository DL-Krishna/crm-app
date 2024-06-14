import { Request, Response } from 'express';
import Call from '../models/call.model';
import { BlobServiceClient } from '@azure/storage-blob';
import { leadOptions, userOptions } from '../utilities/include-options';
import { generateUniqueBlobName } from '../utilities/utilities';
import fs from 'fs';

const containerName = process.env.AZURE_RECORDING_CONTAINER_NAME || 'crmpublicimg';
const connectionString = process.env.AZURE_RECORDING_CONNECTION_STRING || 'DefaultEndpointsProtocol=https;AccountName=crm2024;AccountKey=mbmiP06yg1P/sj6xkN/9XQYphp6vbmQARXwHDMiytvnsChxcbHqfqzk5BfDxZ5HSsN5jlWnom/QA+ASthJRHoQ==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

// Function to upload voice recording to Azure Blob Storage
export const uploadVoiceRecording = async (file: Express.Multer.File): Promise<string> => {
    console.log(file, 'rec');
    return new Promise<string>((resolve, reject) => {
        const blobName = generateUniqueBlobName('voiceRecordings', file.originalname);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload file to Azure Blob Storage
        blockBlobClient.uploadFile(file.path)
            .then(() => {
                // Construct the URL for accessing the uploaded blob
                const blobUrl = blockBlobClient.url;
                resolve(blobUrl);

                // Delete the file from the upload folder after uploading
                fs.unlink(file.path, (error) => {
                    if (error) {
                        console.error('Error deleting file:', error);
                    }
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const sendCallDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
        let voiceRecordingUrl = null;
        const { leadId, userId, callType, outgoingCallStatus, callStartTime, callEndTime, subject } = req.body;

        // Upload voice recording to Azure Blob Storage
        if (req.file) {
            voiceRecordingUrl = await uploadVoiceRecording(req.file);
        }

        Call.sync({ alter: true});

        // Create the call record in the database
        await Call.create({
            leadId,
            userId,
            callType,
            outgoingCallStatus,
            callStartTime,
            callEndTime,
            subject,
            voiceRecording: voiceRecordingUrl // Save the URL of the voice recording
        });

        return res.status(200).json({ message: 'Call details saved successfully.' });
    } catch (error: any) {
        console.error('Error sending call details:', error.toString());
        return res.status(500).json({ message: 'Error sending call details.', error: error.message });
    }
};

export const getAllCalls = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Fetch all calls with associated lead and user details
        const calls = await Call.findAll({
            include: [
                leadOptions,
                userOptions
            ]
        });
        return res.status(200).json({ calls });
    } catch (error: any) {
        console.error('Error fetching calls:', error.toString());
        return res.status(500).json({ message: 'Error fetching calls.', error: error.message });
    }
};

export const getCallsByLeadId = async (req: Request, res: Response): Promise<Response> => {
    const leadId = parseInt(req.params.leadId);
    try {
        // Fetch calls by lead ID with associated lead and user details
        const calls = await Call.findAll({
            where: { leadId },
            include: [
                leadOptions,
                userOptions
            ]
        });
        return res.status(200).json({ calls });
    } catch (error: any) {
        console.error('Error fetching calls by lead ID:', error.toString());
        return res.status(500).json({ message: 'Error fetching calls by lead ID.', error: error.message });
    }
};