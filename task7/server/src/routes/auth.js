import express from 'express';
import jwt from 'jsonwebtoken';
import models from '../models/index';
import config from '../config';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

const router = express.Router();

// Authorization

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	models.users.find({
		where: {
			username,
			password,
		},
	}).then((usr) => {
		if (usr) {
			const user = { username, password };
			jwt.sign(user, config.secret, { expiresIn: config.tokenLife }, (err, token) => {
				if (err) {
					res.status(500).send(err);
				}
				res.json({ token });
			});
		} else {
			res.send('unknown user');
		}
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

// Register new user

router.post('/signup', (req, res) => {
	const { username, password } = req.body;
	models.users.create({
		username,
		password,
	}).then(() => {
		res.end('Success');
	}).then(() => {
		logToDB('add user');
	}).catch((err) => {
		Logger.error(err);
		err.errors && err.errors[0].message === 'username must be unique' //eslint-disable-line no-unused-expressions
			? res.send('username must be unique')
			: res.status(500).send(err.message);
	});
});

export default router;
