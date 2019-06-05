const config = {
	development: {
		dialect: 'mysql',
		username: 'root',
		password: 'password',
		database: 'departments-sequelize',
		host: '127.0.0.1',
		define: {
			timestamps: false,
		},
		logging: false,
	},
	test: {
		dialect: 'mysql',
		username: 'root',
		password: 'password',
		database: 'departments-sequelize',
		host: '127.0.0.1',
		define: {
			timestamps: false,
		},
		logging: false,
	},
	production: {
		dialect: 'mysql',
		username: 'root',
		password: 'password',
		database: 'departments-sequelize',
		host: '127.0.0.1',
		define: {
			timestamps: false,
		},
		logging: false,
	},
};

export default config;
