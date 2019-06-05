
/* eslint-disable object-shorthand, vars-on-top, prefer-destructuring, no-shadow, import/no-unresolved */

var http = require('http');
var url = require('url');
var mysql = require('mysql');
var ejs = require('ejs');
var fs = require('fs');
var payload = require('request-payload');
var querystring = require('querystring');

var DepartmentService = require('./src/services/DepartmentService');
var EmployeeService = require('./src/services/EmployeeService');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: '127.0.0.1',
	user: 'root',
	password: 'password',
	database: 'departments&employees',
});

exports.pool = pool;

http.createServer(function(req, res) {
	var path = url.parse(req.url);
	var departmentService = new DepartmentService();
	var employeeService = new EmployeeService();

	switch (path.pathname) {
		case '/':
			departmentService.getDepartmentList().then(function(departments) {
				var template = fs.readFileSync('./src/view/departments.ejs', 'utf-8');
				res.writeHeader(200, { 'Content-Type': 'text/html' });
				res.end(ejs.render(template, { departments: departments }));
			}).catch(function(err) {
				throw err;
			});
			break;

		case '/department':
			var id = querystring.parse(path.query).id;
			departmentService.getDepartment(id).then(function(name) {
				res.writeHeader(200, { 'Content-Type': 'text/html' });
				var template = fs.readFileSync('./src/view/department.ejs', 'utf-8');
				res.end(ejs.render(template, { id: id, name: name }));
			}).catch(function(err) {
				throw err;
			});
			break;

		case '/drop-department':
			payload(req, function(body) {
				var id = JSON.parse(body).id;
				departmentService.dropDepartment(id).then(function(departments) {
					res.writeHeader(200, { 'Content-Type': 'text/html' });
					var template = fs.readFileSync('./src/view/departments.ejs', 'utf-8');
					res.end(ejs.render(template, { departments: departments }));
				}).catch(function(err) {
					throw err;
				});
			});
			break;

		case '/addDepartment':
			payload(req, function(body) {
				var department = JSON.parse(body).department_name;
				departmentService.setDepartment(department).then(function(result) {
					if (result === 'Value is not unique') {
						res.end('Value is not unique');
					} else {
						res.end('Success');
					}
				}).catch(function(err) {
					throw err;
				});
			});
			break;

		case '/editDepartment':
			payload(req, function(body) {
				var departmentInfo = JSON.parse(body);
				var id = departmentInfo.id;
				var department = departmentInfo.department_name;
				departmentService.setDepartment(department, id).then(function(result) {
					if (result === 'Value is not unique') {
						res.end('Value is not unique');
					} else {
						res.end('Success');
					}
				}).catch(function(err) {
					throw err;
				});
			});
			break;

		case '/employees-list':
			var department = querystring.parse(path.query).department;
			if (department) {
				payload(req, function() {
					var sql = mysql.format('SELECT * FROM employees WHERE department=?', department);
					pool.query(sql, function(error, employees) {
						if (error) throw error;
						res.writeHeader(200, { 'Content-Type': 'text/html' });
						var template = fs.readFileSync('./src/view/list.ejs', 'utf-8');
						res.end(ejs.render(template, { employees: employees, department: department }));
					});
				});
			} else {
				res.statusCode = 404;
				res.end('404 Not found');
			}
			break;

		case '/layOff':
			payload(req, function(body) {
				var department = querystring.parse(path.query).department;
				var id = JSON.parse(body).id;
				employeeService.layOffEmployee(id).then(function(employees) {
					res.writeHeader(200, { 'Content-Type': 'text/html' });
					var template = fs.readFileSync('./src/view/list.ejs', 'utf-8');
					res.end(ejs.render(template, { employees: employees, department: department }));
				}).catch(function(err) {
					throw err;
				});
			});
			break;

		case '/employee':
			var departmentName = querystring.parse(path.query).department;
			var employeeId = querystring.parse(path.query).id;
			employeeService.getEmployee(employeeId).then(function(employee) {
				res.writeHeader(200, { 'Content-Type': 'text/html' });
				var template = fs.readFileSync('./src/view/employee.ejs', 'utf-8');
				res.end(ejs.render(template, { id: employeeId, employee: employee, department: departmentName }));
			}).catch(function(err) {
				throw err;
			});
			break;

		case '/addEmployee':
			payload(req, function(body) {
				var reqBody = JSON.parse(body);
				var department = reqBody.department;
				var name = reqBody.name;
				var email = reqBody.email;
				var birthday = reqBody.birthday;
				var salary = reqBody.salary;

				employeeService.setEmployee(department, name, email, birthday, salary).then(function(result) {
					if (result === 'Email is not unique') {
						res.end('Email is not unique');
					} else {
						res.end('Success');
					}
				}).catch(function(err) {
					throw err;
				});
			});
			break;

		case '/editInfo':
			payload(req, function(body) {
				var reqBody = JSON.parse(body);
				var department = reqBody.department;
				var id = reqBody.employee_ID;
				var name = reqBody.name;
				var email = reqBody.email;
				var birthday = reqBody.birthday;
				var salary = reqBody.salary;

				employeeService.setEmployee(department, name, email, birthday, salary, id).then(function(result) {
					if (result === 'Email is not unique') {
						res.end('Email is not unique');
					} else {
						res.end('Success');
					}
				}).catch(function(err) {
					throw err;
				});
			});
			break;

		default:
			res.statusCode = 404;
			res.end('404 Not found');
	}
}).listen(3000);
