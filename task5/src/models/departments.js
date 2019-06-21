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

	departments.prototype.setDepartment = (name, id) => (
		sequelize.transaction((t) => {
			const promise = id ? (
				departments.update(
					{ department_name: name },
					{ where: { department_id: id } },
					{ transaction: t },
				)
			) : (
				sequelize.query('INSERT INTO departments (department_name) VALUES (?)', {
					type: sequelize.QueryTypes.INSERT,
					replacements: [name],
				}, { transaction: t })
			);
			return promise.catch(function(err) {
				err.errors.forEach(function(i) {
					if (i.message === 'department_name must be unique') {
						throw new Error('Value is not unique');
					}
				});
				console.log(err);
			});
		})
	);

	return departments;
};
