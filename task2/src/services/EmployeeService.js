var mysql = require('mysql');
var Promise = require('bluebird');
var pool = require('../../server');

function checkEmail(email, id) {
	return new Promise(function(resolve) {
		var sql;
		if (id) {
			sql = mysql.format('SELECT EXISTS(SELECT * FROM employees WHERE email=? AND employee_ID!=?)', [email, id]); // eslint-disable-line max-len
		} else {
			sql = mysql.format('SELECT EXISTS(SELECT * FROM employees WHERE email=?)', email);
		}
		pool.pool.query(sql, function(error, result) {
			if (error) throw error;
			resolve(result[0][Object.keys(result[0])]);
		});
	});
}

function EmployeeService() {}

EmployeeService.prototype.getEmployee = function(id) {
	return new Promise(function(resolve) {
		var sql = mysql.format('SELECT * FROM employees WHERE employee_ID=?', id);
		if (!id) {
			resolve('');
			return;
		}
		pool.pool.query(sql, function(error, result) {
			if (error) throw error;
			resolve(result[0]);
		});
	});
};

EmployeeService.prototype.layOffEmployee = function(id) {
	return new Promise(function(resolve) {
		var sql = mysql.format('DELETE FROM employees WHERE employee_ID=?', id);
		pool.pool.query(sql, function(error, result) {
			if (error) throw error;
			resolve(Object.keys(result).map(function(i) {
				return result[i];
			}));
		});
	});
};

EmployeeService.prototype.setEmployee = function(department, name, email, birthday, salary, id) {
	return new Promise(function(resolve) {
		checkEmail(email, id).then(function(exists) {
			if (exists) {
				resolve('Email is not unique');
			} else {
				var sql, //eslint-disable-line vars-on-top, one-var
					values;
				if (!id) {
					values = [name, email, birthday, salary, department];
					sql = mysql.format('INSERT INTO employees (name, email, birthday, salary, department) VALUES (?)', [values]); // eslint-disable-line max-len
				} else {
					values = [name, email, birthday, salary, department, id];
					sql = mysql.format('UPDATE employees SET name=?, email=?, birthday=?, salary=?, department=? WHERE employee_ID=?', values); // eslint-disable-line max-len
				}
				pool.pool.query(sql, function(error, result) {
					if (error) throw error;
					resolve(result);
				});
			}
		}).catch(function(err) {
			throw err;
		});
	});
};

module.exports = EmployeeService;
