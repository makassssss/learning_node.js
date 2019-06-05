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

	employees.prototype.editEmployeeInfo = (id, name, email, birthday, salary) => (
		sequelize.transaction(t => (
			employees.update({
				name, email, birthday, salary,
			}, { where: { id } }, { transaction: t }).catch((err) => {
				err.errors.forEach((i) => {
					if (i.message === 'email must be unique') throw new Error('Email is not unique');
				});
			})
		))
	);

	employees.prototype.changeBirthdayFormat = (birthday) => {
		const year = birthday.getFullYear();
		const month = birthday.getMonth() + 1 < 10
			? `0${birthday.getMonth() + 1}`
			: birthday.getMonth() + 1;
		const day = birthday.getDate() < 10
			? `0${birthday.getDate()}`
			: birthday.getDate();

		return `${year}-${month}-${day}`;
	};

	return employees;
};
