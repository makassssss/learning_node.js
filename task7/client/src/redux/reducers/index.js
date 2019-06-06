import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import departments from './departments';
import employees from './employees';
import { isLoading, addSuccess, editSuccess, fail } from './app';

const rootReducer = combineReducers({
	isLoading,
	departments,
	employees,
	addSuccess,
	editSuccess,
	fail,
	routing,
});

export default rootReducer;
