"use strict";

var department = {
	0: {
		id: 0,
		salary: 100,
	},
	1: {
		id: 1,
		salary: 200,
	},
	2: {
		id: 2,
		salary: 300,
	},
	3: {
		id: 3,
		salary: 400,
	},
};

var averageSalary = function(department) {
	var result,
		sum = 0,
		counter = 0;
	for (var i in department) {
		counter++;
		sum += department[i].salary;
	}
	result = Math.round(sum / counter);
	return result;
};

console.log(averageSalary(department));

var outlay = function(department) {
	var arr = [];
	for (var i in department) {
		arr.push(department[i].salary);
	}
	var result = arr.reduce(function(a, b) {
		return a + b;
	});
	return result;
};

console.log(outlay(department));

var poorGuys = function(department) {
	var povertyLine = averageSalary(department);
	var arr = Object.entries(department);
	var result = arr.filter(function(i) {
		if (i[1].salary < povertyLine) {
			return i;
		}
	});
	return result;
};

console.log(poorGuys(department));

var Employee = function(departmentName, employeeName, salary) {
	this.department = departmentName;
	this.name = employeeName;
	this.salary = salary;
};

console.log(new Employee('department1', 'Bob', 300));
