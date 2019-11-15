import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, config.secret, (err) => {
			if (err) {
				res.status(500).json({ error: err.message });
			}
			next();
		});
	} else {
		res.status(500).json({ error: 'no token' });
	}
};
