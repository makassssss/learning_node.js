import express from 'express';
import ChatService from '../services/chatService';

const router = express.Router();
const chatService = new ChatService();

router.get('/getChatUsers', async (req, res) => {
    const result = await chatService.getUsers();
    res.send(result);
});

router.post('/getHistory', async (req, res) => {
   const { user1, user2 } = req.body;
   const result = await chatService.getHistory(user1, user2);
   res.send(result);
});

export default router;
