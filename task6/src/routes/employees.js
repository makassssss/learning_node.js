import express from 'express';
import models from '../models';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB';

const router = express.Router();

router.get('/employees-list', (req, res) => {
	const departmentId = req.query.department;
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
				departmentName: department.dataValues.department_name,
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
	const { department, id } = req.query;
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
			department,
			view: 'employee',
		});
	}).then(() => {
		logToDB('get employee');
	}).catch((err) => {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/setEmployee', (req, res) => {
	const {
		id,
		name,
		email,
		birthday,
		salary,
		department,
	} = req.body;
	models.employees.prototype.setEmployee(id, name, email, birthday, salary, department).then(() => {
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
