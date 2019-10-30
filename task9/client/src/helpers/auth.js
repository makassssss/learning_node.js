import jwt from 'jsonwebtoken';

export const configWithAuthHeader = () => ({
	headers: {
		'Authorization': localStorage.getItem('token'),
	}
});

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
