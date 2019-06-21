/*eslint-disable strict, object-shorthand, prefer-destructuring, prefer-template*/

'use strict';

module.exports = function(sequelize, DataTypes) {
	var departments = sequelize.define('departments', {
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
			findDepartmentByID: function(id) {
				return {
					where: {
						department_id: id,
					},
				};
			},
		},
	});

	departments.associate = function(models) {
		departments.hasMany(models.employees, {
			foreignKey: 'id',
		});
	};

	departments.prototype.setDepartment = function(name, id) {
		return sequelize.transaction(function(t) {
			var promise;
			if (id) {
				promise = departments.update(
					{ department_name: name },
					{ where: { department_id: id } },
					{ transaction: t },
				);
			} else {
				promise = sequelize.query('INSERT INTO departments (department_name) VALUES (?)', {
					type: sequelize.QueryTypes.INSERT,
					replacements: [name],
				}, { transaction: t });
			}
			return promise.catch(function(err) {
				err.errors.forEach(function(i) {
					if (i.message === 'department_name must be unique') {
						throw new Error('Value is not unique');
					}
				});
				console.log(err);
			});
		});
	};

	return departments;
};
