var mysql = require('mysql');
var Promise = require('bluebird');
var pool = require('../server');
var Logger = require('../services/Logger.js');

function checkEmail(email, id) {
	return new Promise(function(resolve, reject) {
		var sql;
		if (id) {
			sql = mysql.format('SELECT EXISTS(SELECT * FROM employees WHERE email=? AND employee_ID!=?)', [email, id]);
		} else {
			sql = mysql.format('SELECT EXISTS(SELECT * FROM employees WHERE email=?)', email);
		}
		pool.pool.query(sql, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result[0][Object.keys(result[0])]);
			}
		});
	});
}

function changeBirthdayFormat(birthday) {
	var year = birthday.getFullYear(), //eslint-disable-line one-var
		month,
		day;
	if (birthday.getMonth() + 1 < 10) {
		month = '0' + (birthday.getMonth() + 1); //eslint-disable-line prefer-template
	} else {
		month = (birthday.getMonth() + 1);
	}
	if (birthday.getDate() + 1 < 10) {
		day = '0' + birthday.getDate(); //eslint-disable-line prefer-template
	} else {
		day = birthday.getDate();
	}

	return year + '-' + month + '-' + day; //eslint-disable-line prefer-template
}

function EmployeeService() {}

EmployeeService.prototype.getEmployees = function(department) {
	return new Promise(function(resolve, reject) {
		var sql = mysql.format('SELECT * FROM employees WHERE department=?', department);
		pool.pool.query(sql, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

EmployeeService.prototype.getEmployee = function(id) {
	return new Promise(function(resolve, reject) {
		if (!id) {
			resolve('');
			return;
		}
		var sql = mysql.format('SELECT * FROM employees WHERE employee_ID=?', id); //eslint-disable-line vars-on-top
		pool.pool.query(sql, function(err, employee) {
			if (err) {
				reject(err);
			} else {
				var birthday = employee[0].birthday; //eslint-disable-line vars-on-top, prefer-destructuring
				employee[0].birthday = changeBirthdayFormat(birthday); //eslint-disable-line no-param-reassign
				resolve(employee[0]);
			}
		});
	});
};

EmployeeService.prototype.setEmployee = function(department, name, email, birthday, salary, id) {
	return new Promise(function(resolve, reject) {
		checkEmail(email, id).then(function(exists) {
			if (exists) {
				resolve('Email is not unique');
			} else {
				var sql; //eslint-disable-line vars-on-top
				if (!id) {
					sql = mysql.format('INSERT INTO employees (name, email, birthday, salary, department) VALUES (?)', [[name, email, birthday, salary, department]]); // eslint-disable-line max-len
				} else {
					sql = mysql.format('UPDATE employees SET name=?, email=?, birthday=?, salary=?, department=? WHERE employee_ID=?', [name, email, birthday, salary, department, id]); // eslint-disable-line max-len
				}
				pool.pool.query(sql, function(err, res) {
					if (err) {
						reject(err);
					} else {
						resolve(res);
					}
				});
			}
		}).catch(function(err) {
			Logger.error(err);
			console.log(err);
		});
	});
};

EmployeeService.prototype.layOff = function(id) {
	return new Promise(function(resolve, reject) {
		var sql = mysql.format('DELETE FROM employees WHERE employee_ID=?', id);
		pool.pool.query(sql, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

module.exports = EmployeeService;
