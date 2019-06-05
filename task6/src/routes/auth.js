import express from 'express';
import jwt from 'jsonwebtoken';
import models from '../models/index';
import config from '../config';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/departments');
});

router.get('/signup', (req, res) => {
	res.render('index.ejs', { view: 'signup' });
});

router.get('/login', (req, res) => {
	res.render('index.ejs', { view: 'login' });
});

router.get('/logout', (req, res) => {
	res.clearCookie('token');
	res.redirect('/');
});

router.post('/checkUser', (req, res) => {
	const { username, password } = req.body;
	models.users.find({
		where: {
			username,
			password,
		},
	}).then((usr) => {
		const user = { username, password };
		if (usr) {
			jwt.sign(user, config.secret, { expiresIn: config.tokenLife }, (err, token) => {
				if (err) {
					console.log(err);
				}
				res.cookie('token', token);
				res.send();
			});
		} else {
			res.send('unknown user');
		}
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/addUser', (req, res) => {
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
			? res.end('Validation error')
			: res.status(500).send(err.message);
	});
});

export default router;
