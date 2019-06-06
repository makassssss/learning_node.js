import Logger from 'winston';

Logger.configure({
	transports: [new (Logger.transports.File)({ filename: 'errors.log' })],
});

export default Logger;
