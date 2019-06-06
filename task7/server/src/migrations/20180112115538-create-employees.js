export default {
	up: (queryInterface, Sequelize) => (
		queryInterface.createTable('employees', {
			id: {
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			birthday: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			salary: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			department_id: {
				allowNull: false,
				type: Sequelize.STRING,
			},
		})
	),
	down: queryInterface => queryInterface.dropAllTables(),
};
