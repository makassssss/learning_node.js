/*eslint-disable object-shorthand, prefer-destructuring, newline-per-chained-call*/

var express = require('express');
var models = require('../models');
var Logger = require('../logger/Logger');
var logToDB = require('../logger/logToDB');

var router = express.Router();

router.get('/', function(req, res) {
	models.departments.findAll().then(function(departments) {
		res.render('index.ejs', { departments: departments, view: 'departments' });
	}).then(function() {
		logToDB('get departments');
	}).catch(function(err) {
		console.log('ERROR');
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/drop-department', function(req, res) {
	var id = req.body.id;
	models.departments.scope({ method: ['findDepartmentByID', id] }).destroy().then(function() {
		res.end();
	}).then(function() {
		logToDB('delete department');
	}).catch(function(err) {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.get('/department', function(req, res) {
	var departmentId = req.query.id;
	models.departments.find({
		where: {
			department_id: departmentId,
		},
	}).then(function(department) {
		let departmentName;
		if (department) {
			departmentName = department.dataValues.department_name;
		} else {
			departmentName = '';
		}
		res.render('index.ejs', { name: departmentName, id: departmentId, view: 'department' });
	}).then(function() {
		logToDB('get department');
	}).catch(function(err) {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

router.post('/setDepartment', function(req, res) {
	var departmentName = req.body.department_name;
	var id = req.body.id;
	models.departments.prototype.setDepartment(departmentName, id).then(function() {
		res.end();
	}).then(function() {
		if (id) {
			logToDB('edit department');
		} else {
			logToDB('add department');
		}
	}).catch(function(err) {
		Logger.error(err);
		res.status(500).send(err.message);
	});
});

module.exports = router;
