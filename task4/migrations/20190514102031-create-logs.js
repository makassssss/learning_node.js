/*eslint-disable strict, object-shorthand*/

'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('logs', {
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
		});
	},
	down: function(queryInterface) {
		return queryInterface.dropTable('logs');
	},
};
