/*eslint-disable strict, object-shorthand*/

module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface.createTable('departments', {
			department_name: {
				type: Sequelize.STRING,
				unique: true,
			},
		}).then(() => (
			queryInterface.bulkInsert('departments', [
				{ department_name: 'd1' },
				{ department_name: 'd2' },
			])
		)).then(() => (
			queryInterface.createTable('employees', {
				name: Sequelize.STRING,
				email: {
					type: Sequelize.STRING,
					unique: true,
				},
				birthday: Sequelize.DATE,
				salary: Sequelize.INTEGER,
			})
		)).then(() => (
			queryInterface.bulkInsert('employees', [
				{
					name: 'Bill',
					email: 'bill@gmail.com',
					birthday: '1989-02-19',
					salary: 200,
					department_id: 1,
				},
				{
					name: 'Bob',
					email: 'bob@gmail.com',
					birthday: '1993-07-24',
					salary: 500,
					department_id: 1,
				},
				{
					name: 'Jack',
					email: 'jack@gmail.com',
					birthday: '1983-11-05',
					salary: 350,
					department_id: 2,
				},
				{
					name: 'John',
					email: 'john@gmail.com',
					birthday: '1998-05-09',
					salary: 200,
					department_id: 2,
				},
			])
		))
	),

	down: queryInterface => queryInterface.dropAllTables(),
};
