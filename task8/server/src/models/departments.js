export default (sequelize, DataTypes) => {
	const departments = sequelize.define('departments', {
		department_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		department_name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	});

	departments.associate = (models) => {
		departments.hasMany(models.employees, {
			foreignKey: 'id',
		});
	};

	return departments;
};
