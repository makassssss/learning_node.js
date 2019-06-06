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

// Add new employee

router.post('/add-employee', (req, res) => {
	const {
		departmentId,
		name,
		email,
		birthday,
		salary,
	} = req.body;
	models.employees.create({
		name,
		email,
		birthday,
		salary,
		department_id: departmentId,
	}).then((newEmployee) => {
		const { id } = newEmployee.dataValues;
		res.send({ success: true, id });
	}).then(() => {
		logToDB('add employee');
	}).catch((err) => {
		res.send({ success: false, err: err.message });
		Logger.error(err);
	});
});

// Edit employee info

router.post('/edit-employee', (req, res) => {
	const {
		id,
		name,
		email,
		birthday,
		salary,
	} = req.body;
	models.employees.prototype.editEmployeeInfo(id, name, email, birthday, salary).then(() => {
		res.send({ success: true });
	}).then(() => {
		logToDB('edit employee info');
	}).catch((err) => {
		res.send({ success: false, err: err.message });
		Logger.error(err);
	});
});

export default router;
