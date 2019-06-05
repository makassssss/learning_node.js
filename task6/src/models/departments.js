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
	}, {
		scopes: {
			findDepartmentByID: id => (
				{
					where: {
						department_id: id,
					},
				}
			),
		},
	});

	departments.associate = (models) => {
		departments.hasMany(models.employees, {
			foreignKey: 'id',
		});
	};

	departments.prototype.addDepartment = name => (
		sequelize.transaction(function(t) {
			return sequelize.query('INSERT INTO departments (department_name) VALUES (?)', {
				type: sequelize.QueryTypes.INSERT,
				replacements: [name],
			}, { transaction: t }).catch((err) => {
				err.errors.forEach((i) => {
					if (i.message === 'department_name must be unique') throw new Error('Value is not unique');
				});
				console.log(err);
			});
		})
	);

	departments.prototype.editDepartment = (name, id) => (
		sequelize.transaction(t => (
			departments.update(
				{ department_name: name },
				{ where: { department_id: id } },
				{ transaction: t },
			).catch((err) => {
				err.errors.forEach((i) => {
					if (i.message === 'department_name must be unique') throw new Error('Value is not unique');
				});
				console.log(err);
			})
		))
	);

	return departments;
};
