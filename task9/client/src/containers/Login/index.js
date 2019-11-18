import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/actionCreators';

const Login = ({ ...props }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
    const fail = useSelector(state => state.fail.login);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(actions.login(username, password, props.history));
	};

	return (
		<div className="login-page">
			<header>
				<h3 className="my-4 text-center">Login Page</h3>
			</header>
			<main>
				<form className="mx-auto w-25" id="form" onSubmit={handleSubmit}>
					<div className="form-group">
						{/* eslint-disable-next-line */}
						<label htmlFor="username">username</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							required
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-group">
						{/* eslint-disable-next-line */}
						<label htmlFor="password">password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							required
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<input
							type="submit"
							className="btn btn-secondary"
							value="Login"
						/>
						<Link to="/signup">
							<span className="link ml-4">Sign up</span>
						</Link>
						{
                            fail && (
								<span className="validation unknown-user pl-4">Invalid username or password!</span>
							)
						}
					</div>
				</form>
			</main>
		</div>
	);
};

Login.propTypes = {
	fetchInitialData: PropTypes.func,
	history: PropTypes.object,
};

export default Login;
