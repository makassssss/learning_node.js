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

	departments.prototype.addDepartment = function(name) {
		return sequelize.transaction(function(t) {
			return sequelize.query('INSERT INTO departments (department_name) VALUES (?)', {
				type: sequelize.QueryTypes.INSERT,
				replacements: [name],
			}, { transaction: t }).catch(function(err) {
				err.errors.forEach(function(i) {
					if (i.message === 'department_name must be unique') {
						throw new Error('Value is not unique');
					}
				});
				console.log(err);
			});
		});
	};

	departments.prototype.editDepartment = function(name, id) {
		return sequelize.transaction(function(t) {
			return departments.update(
				{ department_name: name },
				{ where: { department_id: id } },
				{ transaction: t },
			).catch(function(err) {
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
