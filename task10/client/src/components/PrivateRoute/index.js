import React, { useState }from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import checkAuth from '../../helpers/auth';
import Chat from 'containers/Chat';

const mapStateToProps = state => ({
	isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const PrivateRoute = ({ ...props }) => {

    const [isChatOpen, setIsChatOpen] = useState(false);

	const handleLogOutClick = () => {
		localStorage.removeItem('token');
		props.history.push('/');
	};

	const isAuthorized = checkAuth();

	return (
		isAuthorized
			? (
				<>
                    <Chat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)}/>
					<span
						id="log-out"
						className="btn btn-secondary position-absolute mr-3"
						onClick={handleLogOutClick}
					>
						Log Out
					</span>
					{
						!props.isLoading && <Route {...props} />
					}
				</>
			)
			: <Redirect to="/login" />
	);
};

PrivateRoute.propTypes = {
	isLoading: PropTypes.bool,
	history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateRoute));
