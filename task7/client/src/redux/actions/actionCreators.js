export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA';
export const PUT_DATA_TO_STORE = 'PUT_DATA_TO_STORE';
export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';
export const DELETE_DEPARTMENT_DONE = 'DELETE_DEPARTMENT_DONE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const DELETE_EMPLOYEE_DONE = 'DELETE_EMPLOYEE_DONE';
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
export const EDIT_DEPARTMENT = 'EDIT_DEPARTMENT';
export const ADD_DEPARTMENT_DONE = 'ADD_DEPARTMENT_DONE';
export const EDIT_DEPARTMENT_DONE = 'EDIT_DEPARTMENT_DONE';
export const ADD_DEPARTMENT_FAIL = 'ADD_DEPARTMENT_FAIL';
export const EDIT_DEPARTMENT_FAIL = 'EDIT_DEPARTMENT_FAIL';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const ADD_EMPLOYEE_DONE = 'ADD_EMPLOYEE_DONE';
export const ADD_EMPLOYEE_FAIL = 'ADD_EMPLOYEE_FAIL';
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
export const EDIT_EMPLOYEE_DONE = 'EDIT_EMPLOYEE_DONE';
export const EDIT_EMPLOYEE_FAIL = 'EDIT_EMPLOYEE_FAIL';
export const CLEAR_STATUS = 'CLEAR_STATUS';

export function clearStatus() {
	return {
		type: 'CLEAR_STATUS',
	}
}

export function fetchInitialData() {
    return {
        type: 'FETCH_INITIAL_DATA',
    }
}

function putDataToStore(departments) {
    return {
        type: 'PUT_DATA_TO_STORE',
        departments
    }
}

export function deleteDepartment(id) {
    return {
        type: 'DELETE_DEPARTMENT',
        id
    }
}

function deleteDepartmentDone(id) {
    return {
        type: 'DELETE_DEPARTMENT_DONE',
		id
    }
}

export function deleteEmployee(id) {
    return {
        type: 'DELETE_EMPLOYEE',
        id
    }
}

function deleteEmployeeDone() {
    return {
        type: 'DELETE_EMPLOYEE_DONE'
    }
}

export function addDepartment(name) {
    return {
        type: 'ADD_DEPARTMENT',
        name
    }
}

function addDepartmentDone(id, name) {
    return {
        type: 'ADD_DEPARTMENT_DONE',
        id,
        name
    }
}

function addDepartmentFail(err) {
    return {
        type: 'ADD_DEPARTMENT_FAIL',
        err
    }
}

export function editDepartment(id, name) {
    return {
        type: 'EDIT_DEPARTMENT',
        id,
        name
    }
}

function editDepartmentDone() {
    return {
        type: 'EDIT_DEPARTMENT_DONE'
    }
}

function editDepartmentFail(err) {
    return {
        type: 'EDIT_DEPARTMENT_FAIL',
        err
    }
}

export function addEmployee(departmentId, name, email, birthday, salary) {
    return {
        type: 'ADD_EMPLOYEE',
        departmentId,
        name,
        email,
        birthday,
        salary
    }
}

function addEmployeeDone() {
    return {
        type: 'ADD_EMPLOYEE_DONE'
    }
}

function addEmployeeFail() {
    return {
        type: 'ADD_EMPLOYEE_FAIL'
    }
}

export function editEmployee(departmentId, id, name, email, birthday, salary) {
    return {
        type: 'EDIT_EMPLOYEE',
        departmentId,
        id,
        name,
        email,
        birthday,
        salary
    }
}

function editEmployeeDone() {
    return {
        type: 'EDIT_EMPLOYEE_DONE'
    }
}

function editEmployeeFail() {
    return {
        type: 'EDIT_EMPLOYEE_FAIL'
    }
}