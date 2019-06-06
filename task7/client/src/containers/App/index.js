import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import PrivateRoute from '../../components/PrivateRoute';
import SignUp from '../SignUp';
import Login from '../Login';
import Departments from '../Departments';
import EmployeesList from '../EmployeesList';
import Department from '../Department';
import Employee from '../Employee';
import checkAuth from '../../helpers/auth';
import department from '../../assets/department.jpg';

import './app.scss';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};

class App extends React.Component {

	componentDidMount() {
		const isAuthorized = checkAuth();
		isAuthorized ? this.props.fetchInitialData() : <Redirect to={'/login'}/>;
	};

	render() {
		return (
			<>
				<img className="image" src={department}/>
				<Switch>
					<Route path="/" exact>
						<Redirect to='/departments'/>
					</Route>
					<Route path="/signup" component={SignUp}/>
					<Route path="/login" component={Login}/>
					<PrivateRoute path="/departments" component={Departments}/>,
					<PrivateRoute path="/department" component={Department}/>,
					<PrivateRoute path="/employees-list" component={EmployeesList}/>,
					<PrivateRoute path="/employee" component={Employee}/>,
				</Switch>
			</>
		);
	};
}

export default connect(null, mapDispatchToProps)(withRouter(App));
