module.exports = {
	development: {
		dialect: process.env.DIALECT,
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		define: {
			timestamps: false,
		},
		logging: false,
	},
	test: {
		dialect: process.env.DIALECT,
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		define: {
			timestamps: false,
		},
		logging: false,
	},
	production: {
		dialect: process.env.DIALECT,
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		host: process.env.HOST,
		define: {
			timestamps: false,
		},
		logging: false,
	},
};
