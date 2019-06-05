/*eslint-disable strict*/

'use strict';

module.exports = (sequelize, DataTypes) => {
	const logs = sequelize.define('logs', {
		event: DataTypes.STRING,
		time: DataTypes.STRING,
	}, {});
	return logs;
};
