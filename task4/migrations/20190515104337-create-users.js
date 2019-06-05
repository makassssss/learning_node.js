/*eslint-disable strict, object-shorthand, prefer-destructuring, prefer-template*/

'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	down: function(queryInterface) {
		return queryInterface.dropTable('users');
	},
};
