
/* eslint-disable */

var express = require('express');
var url = require('url');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var DepartmentService = require('./services/DepartmentService');
var EmployeeService = require('./services/EmployeeService');
var Logger = require('./services/Logger');

var app = express();
var router = express.Router();
var departmentService = new DepartmentService();
var employeeService = new EmployeeService();

var pool = mysql.createPool({
	connectionLimit: 10,
	host: '127.0.0.1',
	user: 'root',
	password: 'password',
	database: 'departments&employees',
});

exports.pool = pool;

function logToDB(event) {
	var now = new Date();
	var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
	app.emit('event', { time: time, event: event });
}

app.on('event', (req) => {
	var time = req.time;
	var event = req.event;
	var sql = mysql.format('INSERT INTO logs (time, event) VALUES (?)', [[time, event]]);
	pool.query(sql, (err) => {
		if (err) {
			Logger.error(err);
			console.log(err);
		}
	});
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

router.get('/', function(req, res) {
	departmentService.getDepartments().then(function(departments) {
		logToDB('get departments');
		res.render('index.ejs', { departments: departments, view: 'departments' });
	}).catch(function(err) {
		Logger.error(err);
		console.error(err);
	});
});

router.post('/drop-department', function(req, res) {
	var id = req.body.id;

	departmentService.dropDepartment(id).then(function() {
		res.end();
		logToDB('delete department');
	}).catch(function(err) {
		Logger.error(err);
		console.log(err);
	});
});

router.get('/department', function(req, res) {
	var id = url.parse(req.url, true).query.id;

	departmentService.getDepartment(id).then(function(name) {
		res.render('index.ejs', { id: id, name: name, view: 'department' });
	}).catch(function(err) {
		Logger.error(err);
		console.log(err);
	});
});

router.post('/setDepartment', function(req, res) {
	var departmentName = req.body.department_name;
	var id = req.body.id;

	departmentService.setDepartment(departmentName, id).then(function(result) {
		if (result === 'Value is not unique') {
			res.status(400).end('Value is not unique');
		} else {
			res.end('Success');
			if (id) {
				logToDB('edit department');
			} else {
				logToDB('add department');
			}
		}
	}).catch(function(err) {
		Logger.error(err);
		console.log(err);
	});
});

router.get('/employees-list', function(req, res) {
	var department = req.query.department;

	employeeService.getEmployees(department).then(function(employees) {
		res.render('index.ejs', { employees: employees, department: department, view: 'list' });
		logToDB('get employees list');
	}).catch(function(err) {
		Logger.error(err);
		console.log(err);
	});
});

router.post('/layOff', function(req, res) {
	var id = req.body.id;

	employeeService.layOff(id).then(function() {
		res.end();
		logToDB('delete employee');
	}).catch(function(err) {
		Logger.error(err);
		console.log(err);
	});
});

router.get('/employee', function(req, res) {
	var id = req.query.id;
	var department = req.query.department;

	employeeService.getEmployee(id).then(function(employee) {
		res.render('index.ejs', { id: id, employee: employee, department: department, view: 'employee' });
	}).catch(function(err) {
		Logger.error(err);
		console.log(err);
	});
});

router.post('/setEmployee', function(req, res) {
	var id = req.body.employee_ID;
	var department = req.body.department;
	var name = req.body.name;
	var email = req.body.email;
	var birthday = req.body.birthday;
	var salary = req.body.salary;

	employeeService.setEmployee(department, name, email, birthday, salary, id).then(function(result) {
		if (result === 'Email is not unique') {
			res.status(400).end('Email is not unique');
		} else {
			res.end('Success');
			logToDB('edit employee info');
		}
	}).catch(function(err) {
		Logger.error(err);
		console.log(err);
	});
});

app.listen(3000);
