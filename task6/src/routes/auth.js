import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models/index';
import config from '../config';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/departments');
});

router.get('/signup', (req, res) => {
	res.render('index.ejs', { location: 'signup', view: 'signup' });
});

router.get('/login', (req, res) => {
	res.render('index.ejs', { location: 'login', view: 'login' });
});

router.get('/logout', (req, res) => {
	res.clearCookie('token');
	res.redirect('/');
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	models.users.find({
		where: {
			username,
		},
	}).then((usr) => {
		const user = {
			username,
			password: usr.password,
		};
		if (bcrypt.compareSync(password, user.password)) {
			jwt.sign(user, config.secret, { expiresIn: config.tokenLife }, (err, token) => {
				if (err) {
					console.log(err);
				}
				res.cookie('token', token);
				res.send();
			});
		} else {
			res.status(400).send('unknown user');
		}
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/signup', (req, res) => {
	const { username, password } = req.body;
	models.users.create({
		username,
		password: bcrypt.hashSync(password, 10),
	}).then(() => {
		res.end('Success');
	}).then(() => {
		logToDB('add user');
	}).catch((err) => {
		Logger.error(err);
		err.errors && err.errors[0].message === 'username must be unique' //eslint-disable-line no-unused-expressions
			? res.status(400).send('value must be unique')
			: res.status(500).send(err.message);
	});
});

export default router;
