var mysql = require('mysql');
var Promise = require('bluebird');
var pool = require('../server');
var Logger = require('../services/Logger.js');

function checkName(departmentName, id) {
	return new Promise(function(resolve, reject) {
		var sql;
		if (id) {
			sql = mysql.format('SELECT EXISTS(SELECT * FROM departments WHERE department_name=? AND department_ID!=?)', [departmentName, id]); // eslint-disable-line max-len
		} else {
			sql = mysql.format('SELECT EXISTS(SELECT * FROM departments WHERE department_name=?)', departmentName);
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

function DepartmentService() {}

DepartmentService.prototype.getDepartments = function() {
	return new Promise(function(resolve, reject) {
		pool.pool.query('SELECT * FROM departments', function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

DepartmentService.prototype.getDepartment = function(id) {
	return new Promise(function(resolve, reject) {
		var sql = mysql.format('SELECT department_name FROM departments WHERE department_ID=?', id);
		if (!id) {
			resolve('');
		}
		pool.pool.query(sql, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result[0].department_name);
			}
		});
	});
};

DepartmentService.prototype.dropDepartment = function(id) {
	return new Promise(function(resolve, reject) {
		var sql = mysql.format('DELETE FROM departments WHERE department_ID=?', id);
		pool.pool.query(sql, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

DepartmentService.prototype.setDepartment = function(departmentName, id) {
	return new Promise(function(resolve, reject) {
		checkName(departmentName, id).then(function(exists) {
			if (exists) {
				resolve('Value is not unique');
			} else {
				var sql; //eslint-disable-line vars-on-top
				if (!id) {
					sql = mysql.format('INSERT INTO departments (department_name) VALUES (?)', departmentName);
				} else {
					sql = mysql.format('UPDATE departments SET department_name=? WHERE department_ID=?', [departmentName, id]); // eslint-disable-line max-len
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

module.exports = DepartmentService;
