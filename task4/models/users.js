/*eslint-disable strict*/

'use strict';

module.exports = (sequelize, DataTypes) => {
	const users = sequelize.define('users', {
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {});
	return users;
};
