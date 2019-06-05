import express from 'express';
import models from '../models';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

const router = express.Router();

router.get('/employees-list', (req, res) => {
	const departmentId = req.query.department_id;
	models.departments.find({
		where: {
			department_id: departmentId,
		},
	}).then(department => models.sequelize.transaction(transaction => models.employees.findAll({
		where: {
			department_id: departmentId,
		},
	}, { transaction })).then((employees) => {
		res.render('index.ejs',
			{
				employees,
				departmentId,
				department_name: department.dataValues.department_name,
				view: 'list',
			});
	}).then(() => {
		logToDB('get employees');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	}));
});

router.post('/layOff', (req, res) => {
	const { id } = req.body;
	models.employees.scope({ method: ['layOff', id] }).destroy().then(() => {
		res.end();
		logToDB('delete employee');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.get('/employee', (req, res) => {
	const { department_id: departmentId, id } = req.query;
	models.employees.find({
		where: {
			id,
		},
	}).then((empl) => {
		const employee = empl
			? {
				...empl.dataValues,
				birthday: models.employees.prototype.changeBirthdayFormat(empl.dataValues.birthday),
			}
			: {};
		res.render('index.ejs', {
			employee,
			id,
			department: departmentId,
			view: 'employee',
		});
	}).then(() => {
		logToDB('get employee');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/add-employee', (req, res) => {
	const {
		department: departmentId,
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
	}).then(() => {
		res.end('Success');
	}).then(() => {
		logToDB('add employee');
	}).catch((err) => {
		err.errors && err.errors[0].message === 'email must be unique' //eslint-disable-line no-unused-expressions
			? res.end('Email is not unique')
			: res.status(500).send(err.message);
		Logger.error(err);
	});
});

router.post('/edit-employee', (req, res) => {
	const { id } = req.body;
	const { name } = req.body;
	const { email } = req.body;
	const { birthday } = req.body;
	const { salary } = req.body;
	models.employees.prototype.editEmployeeInfo(id, name, email, birthday, salary).then(() => {
		res.end('Success');
	}).then(() => {
		logToDB('edit employee info');
	}).catch((err) => {
		res.end(err.message);
	});
});

export default router;
