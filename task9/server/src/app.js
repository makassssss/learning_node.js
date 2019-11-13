import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './models/index';
import auth from './routes/auth'; //eslint-disable-line import/no-cycle
import departments from './routes/departments'; //eslint-disable-line import/no-cycle
import employees from './routes/employees';
import chat from './routes/chat';
import isAuthorized from './middlewares/auth';

const app = express();

app.on('event', (req) => {
	const { time, event } = req;
	db.logs.create({
		event,
		time,
	});
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.use('/', auth);
app.use(isAuthorized);
app.use('/api', employees, departments, chat);

export default app;
