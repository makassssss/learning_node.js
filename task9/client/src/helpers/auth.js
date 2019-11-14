import jwt from 'jsonwebtoken';

const checkAuth = () => {
	const token = localStorage.getItem('token');
	return jwt.verify(token, 'qwerty', err => {
		if (err && err.message === 'jwt expired' ) {
			localStorage.removeItem('token');
		}
		return err ? false : true;
	});
};

export default checkAuth;
