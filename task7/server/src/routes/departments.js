import express from 'express';
import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

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

// Add new department

router.post('/add-department', (req, res) => {
	const { name } = req.body;
	models.departments.prototype.addDepartment(name).then((newDepartment) => {
		const id = newDepartment[0];
		res.send({ success: true, id });
	}).then(() => {
		logToDB('add department');
	}).catch((err) => {
		Logger.error(err);
		res.send({ success: false, err: err.message });
	});
});

// Edit department info

router.post('/edit-department', (req, res) => {
	const { id, name } = req.body;
	models.departments.prototype.editDepartment(name, id).then(() => {
		res.send({ success: true });
	}).then(() => {
		logToDB('edit department');
	}).catch((err) => {
		Logger.error(err);
		res.send({ success: false, err: err.message });
	});
});

export default router;
