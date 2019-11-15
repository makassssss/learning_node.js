import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showValidationError, setShowValidationError] = useState(false);
	const [showValidationSuccess, setShowValidationSuccess] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowValidationError(false);
		setShowValidationSuccess(false);
		axios.post('http://localhost:5000/signup', {
			username,
			password,
		}).then((res) => {
			if (res.data === 'username must be unique') {
				throw res.data;
			} else {
				setShowValidationSuccess(true);
			}
		}).catch((err) => {
			err === 'username must be unique'
				? setShowValidationError(true)
				: console.log(err);
		});
	};

	return (
		<div className="signup">
			<header>
				<h3 className="my-4 text-center">Sign Up</h3>
			</header>
			<main>
				<form className="mx-auto w-25" id="form" onSubmit={handleSubmit}>
					<div className="form-group">
						{/* eslint-disable-next-line */}
						<label htmlFor="username">username</label>
						{
							showValidationError && (
								<span className="validation not-unique pl-4">Value must be unique</span>
							)
						}
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
						<label htmlFor="username">password</label>
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
							value="Sign up"
						/>
						<Link to="/login">
							<span className="link ml-4">Log in</span>
						</Link>
						{
							showValidationSuccess && (
								<span className="validation success pl-4">New user has been created</span>
							)
						}
					</div>
				</form>
			</main>
		</div>
	);
};

export default SignUp;
