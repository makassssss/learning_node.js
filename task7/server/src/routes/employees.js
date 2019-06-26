import express from 'express';
import models from '../models';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

const router = express.Router();

// Getting all existing employees

router.get('/employees', (req, res) => {
	models.employees.findAll().then((employees) => {
		res.send(employees);
	}).then(() => {
		logToDB('get employees');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

// Delete employee

router.post('/delete-employee', (req, res) => {
	const { id } = req.body;
	models.employees.scope({ method: ['layOff', id] }).destroy().then(() => {
		res.send({ success: true });
		logToDB('delete employee');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

// Set employee

router.post('/set-employee', (req, res) => {
	const {
		departmentId,
		id,
		name,
		email,
		birthday,
		salary,
	} = req.body;
	models.employees.prototype.setEmployee(id, name, email, birthday, salary, departmentId).then((employees) => {
		const employeeId = !id
			? employees.dataValues.id
			: id;
		res.send({ success: true, id: employeeId });
	}).then(() => {
		id
			? logToDB('edit employee info')
			: logToDB('add employee');
	}).catch((err) => {
		res.send({ success: false, err: err.message });
		Logger.error(err);
	});
});

export default router;
