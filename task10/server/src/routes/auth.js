import express from 'express';
import AuthService from '../services/authService';

const router = express.Router();
const authService = new AuthService();

// Authorization

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const result = await authService.login(username, password);
	res.send(result);
});

// Register new user

router.post('/signup', async (req, res) => {
	const { username, password } = req.body;
	const result = await authService.signup(username, password);
	res.send(result);
});

export default router;
