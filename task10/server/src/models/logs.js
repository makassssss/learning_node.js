export default (sequelize, DataTypes) => {
	const logs = sequelize.define('logs', {
		event: {
			type: DataTypes.STRING,
		},
		time: {
			type: DataTypes.STRING,
		},
	});
	return logs;
};
