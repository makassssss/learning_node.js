/*eslint-disable object-shorthand, prefer-destructuring, no-param-reassign*/

var express = require('express');
var models = require('../models');
var Logger = require('../logger/Logger');
var logToDB = require('../logger/logToDB');

var router = express.Router();

router.get('/employees-list', function(req, res) {
	var departmentId = req.query.department_id;
	models.departments.find({
		where: {
			department_id: departmentId,
		},
	}).then(function(department) {
		return models.sequelize.transaction(function(t) {
			return models.employees.findAll({
				where: {
					department_id: departmentId,
				},
			}, { transaction: t });
		}).then(function(employees) {
			res.render('index.ejs', {
				employees: employees,
				departmentId: departmentId,
				department_name: department.dataValues.department_name,
				view: 'list',
			});
		}).then(function() {
			logToDB('get employees');
		}).catch(function(err) {
			Logger.error(err);
			res.status(500).send(err.message);
		});
	});
});

router.post('/layOff', function(req, res) {
	var id = req.body.id;
	models.employees.scope({ method: ['layOff', id] }).destroy().then(function() {
		res.end();
		logToDB('delete employee');
	}).catch(function(err) {
		Logger.error(err);
		res.send(500, err.message);
	});
});

router.get('/employee', function(req, res) {
	var id = req.query.id;
	var department = req.query.department_id;
	models.employees.find({
		where: {
			id: id,
		},
	}).then(function(employee) {
		if (employee) {
			employee.dataValues.birthday = models.employees.prototype.changeBirthdayFormat(employee.dataValues.birthday); //eslint-disable-line max-len
		} else {
			employee = {};
		}
		res.render('index.ejs', {
			employee: employee,
			id: id,
			department: department,
			view: 'employee',
		});
	}).then(function() {
		logToDB('get employee');
	}).catch(function(err) {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/add-employee', function(req, res) {
	var departmentId = req.body.department_id;
	var name = req.body.name;
	var email = req.body.email;
	var birthday = req.body.birthday;
	var salary = req.body.salary;
	models.employees.create({
		name: name,
		email: email,
		birthday: birthday,
		salary: salary,
		department_id: departmentId,
	}).then(function() {
		res.end('Success');
	}).then(function() {
		logToDB('add employee');
	}).catch(function(err) {
		if (err.errors && err.errors[0].message === 'email must be unique') {
			res.end('Email is not unique');
		} else {
			res.status(500).send(err.message);
		}
		Logger.error(err);
	});
});

router.post('/edit-employee', function(req, res) {
	var id = req.body.id;
	var name = req.body.name;
	var email = req.body.email;
	var birthday = req.body.birthday;
	var salary = req.body.salary;
	models.employees.prototype.editEmployeeInfo(id, name, email, birthday, salary).then(function() {
		res.end('Success');
	}).catch(function(err) {
		res.end(err.message);
	});
});

module.exports = router;
