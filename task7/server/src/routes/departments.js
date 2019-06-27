import express from 'express';
import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB'; //eslint-disable-line import/no-cycle

const router = express.Router();

// Get all departments

router.get('/departments', (req, res) => {
	models.departments.findAll().then((departments) => {
		res.send(departments);
	}).then(() => {
		logToDB('get departments');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

// Delete department

router.post('/delete-department', (req, res) => {
	const { id } = req.body;
	models.departments.scope({ method: ['findDepartmentByID', id] }).destroy().then(() => {
		res.send({ success: true });
	}).then(() => {
		logToDB('delete department');
	}).catch((err) => { //eslint-disable-line newline-per-chained-call
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

// Add or edit department

router.post('/set-department', (req, res) => {
	const { id, name } = req.body;
	models.departments.prototype.setDepartment(name, id).then((department) => {
		const departmentId = !id
			? department[0]
			: id;
		res.send({ success: true, id: departmentId });
	}).then(() => {
		id
			? logToDB('edit department')
			: logToDB('add department');
	}).catch((err) => {
		Logger.error(err);
		res.send({ success: false, err: err.message });
	});
});

export default router;
