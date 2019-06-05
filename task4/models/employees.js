/*eslint-disable strict, object-shorthand, prefer-destructuring, prefer-template*/

'use strict';

module.exports = function(sequelize, DataTypes) {
	var employees = sequelize.define('employees', {
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
			layOff: function(id) {
				return {
					where: {
						id: id,
					},
				};
			},
		},
	});

	employees.associate = function(models) {
		employees.belongsTo(models.departments, {
			foreignKey: 'department_id',
		});
	};

	employees.prototype.editEmployeeInfo = function(id, name, email, birthday, salary) {
		return sequelize.transaction(function(t) {
			return employees.update(
				{
					name: name,
					email: email,
					birthday: birthday,
					salary: salary,
				},
				{ where: { id: id } },
				{ transaction: t },
			).catch(function(err) {
				err.errors.forEach(function(i) {
					if (i.message === 'email must be unique') {
						throw new Error('Email is not unique');
					} else {
						throw err;
					}
				});
			});
		});
	};

	employees.prototype.changeBirthdayFormat = function(birthday) {
		var year = birthday.getFullYear(), //eslint-disable-line one-var
			month,
			day;
		if (birthday.getMonth() + 1 < 10) {
			month = '0' + (birthday.getMonth() + 1);
		} else {
			month = birthday.getMonth() + 1;
		}
		if (birthday.getDate() < 10) {
			day = '0' + birthday.getDate();
		} else {
			day = birthday.getDate();
		}

		return year + '-' + month + '-' + day;
	};

	return employees;
};
