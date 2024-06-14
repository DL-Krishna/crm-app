import express from 'express';
import { sendMessage, getAllMessages } from '../controllers/messages.controller';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/', getAllMessages);

export default router;