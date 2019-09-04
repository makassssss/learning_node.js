module.exports = {
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
		})
	),
	down: queryInterface => queryInterface.dropAllTables(),
};
