import {
	put,
	call,
	all,
	takeLatest,
	delay,
} from 'redux-saga/effects';
import axios from 'axios';
import { configWithAuthHeader } from '../../helpers/auth';
import {
	FETCH_INITIAL_DATA,
	PUT_DATA_TO_STORE,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_DONE,
	DELETE_EMPLOYEE,
	DELETE_EMPLOYEE_DONE,
	SET_DEPARTMENT,
	SET_DEPARTMENT_DONE,
	SET_DEPARTMENT_FAIL,
	SET_EMPLOYEE,
	SET_EMPLOYEE_DONE,
	SET_EMPLOYEE_FAIL,
	CLEAR_STATUS,
} from '../actions/actionCreators';

const error = (err) => console.log(err);

function* getData() {
	const config = configWithAuthHeader();
	const ApiCallDepartments = () => (
		axios.get('http://localhost:5000/api/departments', config)
            .then(res => res.data.departments)
            .catch(error)
	);
	const ApiCallEmployees = () => (
		axios.get('http://localhost:5000/api/employees', config)
            .then(res => res.data.employees)
            .catch(error)
	);
	const departments = yield call(ApiCallDepartments);
	const employees = yield call(ApiCallEmployees);
	yield put({ type: PUT_DATA_TO_STORE, departments, employees });
}

function* setDepartment(action) {
	const config = configWithAuthHeader();
	const { id, name, history } = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/set-department', {
			id,
			name,
		}, config)
            .then(res => res.data)
            .catch(error)
	);
	const result = yield call(ApiCall);
	const { success, err } = result;
	if (success) {
		yield put({ type: SET_DEPARTMENT_DONE, id: result.id, name });
		history.push('/');
	} else {
		yield put({ type: SET_DEPARTMENT_FAIL, err });
		yield delay(2000);
		yield put({ type: CLEAR_STATUS });
	}
}

function* deleteDepartment(action) {
	const config = configWithAuthHeader();
	const { id } = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/delete-department', { id }, config)
            .then(res => res.data)
            .catch(error)
	);
	yield call(ApiCall);
	yield put({ type: DELETE_DEPARTMENT_DONE, id });
}

function* setEmployee(action) {
	const config = configWithAuthHeader();
	const {
		departmentId,
		id,
		name,
		email,
		birthday,
		salary,
		history,
	} = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/set-employee', {
			departmentId,
			id,
			name,
			email,
			birthday,
			salary,
		}, config)
            .then(res => res.data)
            .catch(error)
	);
	const result = yield call(ApiCall);
	const { success, err } = result;
	if (success) {
		yield put({
			type: SET_EMPLOYEE_DONE,
			departmentId,
			id: result.id,
			name,
			email,
			birthday,
			salary,
		});
		history.push(`/employees-list?department=${departmentId}`);
	} else {
		yield put({ type: SET_EMPLOYEE_FAIL, err });
		yield delay(2000);
		yield put({ type: CLEAR_STATUS });
	}
}

function* deleteEmployee(action) {
	const config = configWithAuthHeader();
	const { id } = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/delete-employee', { id }, config)
            .then(res => res.data)
            .catch(error)
	);
	yield call(ApiCall);
	yield put({ type: DELETE_EMPLOYEE_DONE, id });
}

export default function* rootSaga() {
	yield all([
		takeLatest(FETCH_INITIAL_DATA, getData),
		takeLatest(SET_DEPARTMENT, setDepartment),
		takeLatest(DELETE_DEPARTMENT, deleteDepartment),
		takeLatest(SET_EMPLOYEE, setEmployee),
		takeLatest(DELETE_EMPLOYEE, deleteEmployee),
	]);
}
