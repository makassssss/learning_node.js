export default (sequelize, DataTypes) => {
	const employees = sequelize.define('employees', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		birthday: DataTypes.DATE,
		salary: DataTypes.INTEGER,
		department_id: DataTypes.INTEGER,
	}, {
		scopes: {
			layOff: id => ({ where: { id } }),
		},
	});

	employees.associate = (models) => {
		employees.belongsTo(models.departments, {
			foreignKey: 'department_id',
		});
	};

	return employees;
};
