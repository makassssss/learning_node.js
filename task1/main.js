var department1 = [
	{
		id: 0,
		salary: 100,
	},
	{
		id: 1,
		salary: 200,
	},
	{
		id: 2,
		salary: 300,
	},
	{
		id: 3,
		salary: 400,
	},
];

var outlay = function(department) {
	var result = department.reduce(function(sum, current) {
		return sum + current.salary;
	}, 0);
	return result;
};

console.log(outlay(department1));

var averageSalary = function(department) {
	var result = Math.round(outlay(department) / department.length);
	return result;
};

console.log(averageSalary(department1));

var poorGuys = function(department) {
	var povertyLine = averageSalary(department);
	var result = department.filter(function(i) {
		if (i.salary < povertyLine) {
			return i;
		}
		return;
	});
	return result;
};

console.log(poorGuys(department1));

var Employee = function(departmentName, employeeName, salary) {
	this.department = departmentName;
	this.name = employeeName;
	this.salary = salary;
};

console.log(new Employee('department1', 'Bob', 300));
