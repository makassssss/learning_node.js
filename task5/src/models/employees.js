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

	employees.prototype.setEmployee = (id, name, email, birthday, salary, department) => (
		sequelize.transaction((t) => {
			const promise = id ? (
				employees.update(
					{
						name,
						email,
						birthday,
						salary,
					},
					{ where: { id } },
					{ transaction: t },
				)
			) : (
				employees.create({
					name,
					email,
					birthday,
					salary,
					department_id: department,
				})
			);
			return promise.catch(function(err) {
				err.errors.forEach(function(i) {
					if (i.message === 'email must be unique') {
						throw new Error('Email is not unique');
					} else {
						throw err;
					}
				});
			});
		})
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
