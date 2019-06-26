export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA';
export const PUT_DATA_TO_STORE = 'PUT_DATA_TO_STORE';
export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';
export const DELETE_DEPARTMENT_DONE = 'DELETE_DEPARTMENT_DONE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const DELETE_EMPLOYEE_DONE = 'DELETE_EMPLOYEE_DONE';
export const SET_DEPARTMENT = 'SET_DEPARTMENT';
export const SET_DEPARTMENT_DONE = 'SET_DEPARTMENT_DONE';
export const SET_DEPARTMENT_FAIL = 'SET_DEPARTMENT_FAIL';
export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const SET_EMPLOYEE_DONE = 'SET_EMPLOYEE_DONE';
export const SET_EMPLOYEE_FAIL = 'SET_EMPLOYEE_FAIL';
export const CLEAR_STATUS = 'CLEAR_STATUS';

export const clearStatus = () => ({
	type: 'CLEAR_STATUS',
});

export const fetchInitialData = () => ({
	type: 'FETCH_INITIAL_DATA',
});

const putDataToStore = departments => ({
	type: 'PUT_DATA_TO_STORE',
	departments,
});

export const deleteDepartment = id => ({
	type: 'DELETE_DEPARTMENT',
	id,
});

const deleteDepartmentDone = id => ({
	type: 'DELETE_DEPARTMENT_DONE',
	id,
});

export const deleteEmployee = id => ({
	type: 'DELETE_EMPLOYEE',
	id,
});

const deleteEmployeeDone = () => ({
	type: 'DELETE_EMPLOYEE_DONE',
});

export const setDepartment = (id, name, history) => ({
	type: 'SET_DEPARTMENT',
	id,
	name,
	history,
});

const setDepartmentDone = () => ({
	type: 'SET_DEPARTMENT_DONE',
});

const setDepartmentFail = err => ({
	type: 'SET_DEPARTMENT_FAIL',
	err,
});

export const setEmployee = (departmentId, id, name, email, birthday, salary, history) => ({
	type: 'SET_EMPLOYEE',
	departmentId,
	id,
	name,
	email,
	birthday,
	salary,
	history,
});

const setEmployeeDone = () => ({
	type: 'SET_EMPLOYEE_DONE',
});

const setEmployeeFail = () => ({
	type: 'SET_EMPLOYEE_FAIL',
});
