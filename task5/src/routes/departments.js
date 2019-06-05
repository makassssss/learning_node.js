import express from 'express';
import models from '../models/index';
import logToDB from '../logger/logToDB';
import Logger from '../logger/Logger';

const router = express.Router();

router.get('/', (req, res) => {
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
		console.log(err);
		Logger.error(err);
		res.send(500, err.message);
	});
});

router.post('/add-department', (req, res) => {
	const departmentName = req.body.department_name;
	models.departments.prototype.addDepartment(departmentName).then(() => {
		res.end();
	}).then(() => {
		logToDB('add department');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/edit-department', (req, res) => {
	const departmentName = req.body.department_name;
	const { id } = req.body;
	models.departments.prototype.editDepartment(departmentName, id).then(() => {
		res.end();
	}).then(() => {
		logToDB('edit department');
	}).catch((err) => {
		Logger.error(err);
		res.send(500, err.message);
	});
});

export default router;
