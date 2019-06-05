module.exports = {
	development: {
		username: 'root',
		password: 'password',
		database: 'departments-sequelize',
		host: '127.0.0.1',
		dialect: 'mysql',
		define: {
			timestamps: false,
		},
		logging: false,
	},
};
