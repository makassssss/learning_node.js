import React from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import checkAuth from '../../helpers/auth';

const mapStateToProps = state => ({
	isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};

const PrivateRoute = ({ ...props }) => {

	const handleLogOutClick = () => {
		localStorage.removeItem('token');
		props.history.push('/');
	};

	const isAuthorized = checkAuth();

	return (
		isAuthorized
			? (
				<>
					<span
						id="log-out"
						className="btn btn-secondary position-absolute mr-3"
						onClick={handleLogOutClick}
					>
						Log Out
					</span>
					{
						!props.isLoading && <Route {...props}/>
					}
				</>
			)
			: <Redirect to="/login"/>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateRoute));
