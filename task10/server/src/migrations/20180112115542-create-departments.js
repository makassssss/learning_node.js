module.exports = {
	up: (queryInterface, Sequelize) => (
		queryInterface.createTable('departments', {
			department_id: {
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			department_name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
		})
	),
	down: queryInterface => queryInterface.dropAllTables(),
};
