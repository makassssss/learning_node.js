/*eslint-disable strict, object-shorthand, prefer-destructuring, prefer-template*/

'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('departments', {
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
		});
	},
	down: function(queryInterface) {
		return queryInterface.dropAllTables();
	},
};
