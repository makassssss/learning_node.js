export default {
	up: (queryInterface, Sequelize) => (
		queryInterface.createTable('logs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			event: {
				type: Sequelize.STRING,
			},
			time: {
				type: Sequelize.STRING,
			},
		})
	),
	down: queryInterface => queryInterface.dropTable('logs'),
};
