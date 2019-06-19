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
	ADD_DEPARTMENT,
	ADD_DEPARTMENT_DONE,
	ADD_DEPARTMENT_FAIL,
	EDIT_DEPARTMENT,
	EDIT_DEPARTMENT_DONE,
	EDIT_DEPARTMENT_FAIL,
	ADD_EMPLOYEE,
	ADD_EMPLOYEE_DONE,
	ADD_EMPLOYEE_FAIL,
	EDIT_EMPLOYEE,
	EDIT_EMPLOYEE_DONE,
	EDIT_EMPLOYEE_FAIL,
	CLEAR_STATUS,
} from '../actions/actionCreators';

function* getData() {
	const config = configWithAuthHeader();
	const ApiCallDepartments = () => (
		axios.get('http://localhost:5000/api/departments', config).then(res => res.data).catch(err => console.log(err))
	);
	const ApiCallEmployees = () => (
		axios.get('http://localhost:5000/api/employees', config).then(res => res.data).catch(err => console.log(err))
	);
	const departments = yield call(ApiCallDepartments);
	const employees = yield call(ApiCallEmployees);
	yield put({ type: PUT_DATA_TO_STORE, departments, employees });
}

function* addDepartment(action) {
	const config = configWithAuthHeader();
	const { name } = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/add-department', { name }, config).then(res => res.data)
	);
	const response = yield call(ApiCall);
	const { id, success, err } = response;
	success
		? yield put({ type: ADD_DEPARTMENT_DONE, id, name })
		: yield put({ type: ADD_DEPARTMENT_FAIL, err });
	yield delay(3000);
	yield put({ type: CLEAR_STATUS });
}

function* editDepartment(action) {
	const config = configWithAuthHeader();
	const { id, name } = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/edit-department', {
			id,
			name,
		}, config).then(res => res.data)
	);
	const response = yield call(ApiCall);
	const { success, err } = response;
	success
		? yield put({ type: EDIT_DEPARTMENT_DONE, id, name })
		: yield put({ type: EDIT_DEPARTMENT_FAIL, err });
	yield delay(2000);
	yield put({ type: CLEAR_STATUS });
}

function* deleteDepartment(action) {
	const config = configWithAuthHeader();
	const { id } = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/delete-department', { id }, config).then(res => res.data)
	);
	yield call(ApiCall);
	yield put({ type: DELETE_DEPARTMENT_DONE, id });
}

function* addEmployee(action) {
	const config = configWithAuthHeader();
	const {
		departmentId,
		name,
		email,
		birthday,
		salary,
	} = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/add-employee', {
			departmentId,
			name,
			email,
			birthday,
			salary,
		}, config).then(res => res.data)
	);
	const response = yield call(ApiCall);
	const { success, id, err } = response;
	success
		? yield put({
			type: ADD_EMPLOYEE_DONE,
			departmentId,
			id,
			name,
			email,
			birthday,
			salary,
		})
		: yield put({ type: ADD_EMPLOYEE_FAIL, err });
	yield delay(2000);
	yield put({ type: CLEAR_STATUS });
}

function* editEmployee(action) {
	const config = configWithAuthHeader();
	const {
		departmentId,
		id,
		name,
		email,
		birthday,
		salary,
	} = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/edit-employee', {
			departmentId,
			id,
			name,
			email,
			birthday,
			salary,
		}, config).then(res => res.data)
	);
	const response = yield call(ApiCall);
	const { success, err } = response;
	success
		? yield put({
			type: EDIT_EMPLOYEE_DONE,
			departmentId,
			id,
			name,
			email,
			birthday,
			salary,
		})
		: yield put({ type: EDIT_EMPLOYEE_FAIL, err });
	yield delay(2000);
	yield put({ type: CLEAR_STATUS });
}

function* deleteEmployee(action) {
	const config = configWithAuthHeader();
	const { id } = action;
	const ApiCall = () => (
		axios.post('http://localhost:5000/api/delete-employee', { id }, config).then(res => res.data)
	);
	yield call(ApiCall);
	yield put({ type: DELETE_EMPLOYEE_DONE, id });
}

export default function* rootSaga() {
	yield all([
		takeLatest(FETCH_INITIAL_DATA, getData),
		takeLatest(ADD_DEPARTMENT, addDepartment),
		takeLatest(EDIT_DEPARTMENT, editDepartment),
		takeLatest(DELETE_DEPARTMENT, deleteDepartment),
		takeLatest(ADD_EMPLOYEE, addEmployee),
		takeLatest(EDIT_EMPLOYEE, editEmployee),
		takeLatest(DELETE_EMPLOYEE, deleteEmployee),
	]);
}
