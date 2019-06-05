import express from 'express';
import bodyParser from 'body-parser';
import db from './models/index';
import departments from './routes/departments';
import employees from './routes/employees';

const app = express();

app.on('event', (req) => {
	const { time, event } = req;
	db.logs.create({
		event,
		time,
	});
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); //eslint-disable-line prefer-template, no-path-concat

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', employees, departments);

app.listen(3000, () => {
	db.sequelize.sync();
});

export default app;
