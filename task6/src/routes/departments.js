import express from 'express';
import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

const router = express.Router();

router.get('/departments', (req, res) => {
	models.departments.findAll().then((departments) => {
		res.render('index.ejs', { departments, view: 'departments' });
	}).then(() => {
		logToDB('get departments');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/drop-department', (req, res) => {
	const { id } = req.body;
	models.departments.scope({ method: ['findDepartmentByID', id] }).destroy().then(() => {
		res.end();
	}).then(() => {
		logToDB('delete department');
	})
		.catch((err) => {
			Logger.error(err);
			res.status(500).send(err.message);
		});
});

router.get('/department', (req, res) => {
	const { id } = req.query;
	models.departments.find({
		where: {
			department_id: id,
		},
	}).then((department) => {
		const departmentName = department
			? department.dataValues.department_name
			: '';
		res.render('index.ejs', { name: departmentName, id, view: 'department' });
	}).then(() => {
		logToDB('get department');
	}).catch((err) => {
		Logger.error(err);
		res.send(500, err.message);
	});
});

router.post('/setDepartment', (req, res) => {
	const { department_name: departmentName, id } = req.body;
	models.departments.prototype.setDepartment(departmentName, id).then(() => {
		res.end();
	}).then(() => {
		id
			? logToDB('edit employee info')
			: logToDB('add employee');
	}).catch((err) => {
		res.status(400).send(err.message);
	});
});

export default router;
