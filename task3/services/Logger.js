var Logger = require('winston');

Logger.configure({
	transports: [new (Logger.transports.File)({ filename: 'errors.log' })],
});

module.exports = Logger;
