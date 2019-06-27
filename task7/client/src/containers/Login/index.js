import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const Login = ({ ...props }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showValidationError, setShowValidationError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowValidationError(false);
		axios.post('http://localhost:5000/login', {
			username,
			password,
		}).then((res) => {
			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				props.fetchInitialData();
				props.history.push('/');
			} else if (res.data === 'unknown user') {
				setShowValidationError(true);
			}
		}).catch(err => console.log(err));
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
							showValidationError && (
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

export default connect(null, mapDispatchToProps)(Login);
