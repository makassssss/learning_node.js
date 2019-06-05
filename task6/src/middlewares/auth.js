import jwt from 'jsonwebtoken';
import config from '../config';

const html = `
	<div>
		token is expired, please <a href="/login">log in</a>
	</div>
`;

export default (req, res, next) => {
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				err.message === 'jwt expired' //eslint-disable-line no-unused-expressions
					? res.send(html)
					: res.send(err);
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};
