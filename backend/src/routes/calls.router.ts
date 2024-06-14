import express from 'express';
import { sendCallDetails, getAllCalls, getCallsByLeadId } from '../controllers/calls.controller';
import multer from 'multer';

const router = express.Router();

// Set up multer middleware
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('voiceRecording'), sendCallDetails);

// Routes for managing calls
router.get('/', getAllCalls);
router.get('/lead/:leadId', getCallsByLeadId);

export default router;
