import app from '../app';

export default function logToDB(event) {
	const now = new Date();
	const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
	app.emit('event', { time, event });
}
