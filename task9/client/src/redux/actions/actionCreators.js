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
export const SIGNUP = 'SIGNUP';
export const SIGNUP_DONE = 'SIGNUP_DONE';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGIN = 'LOGIN';
export const LOGIN_DONE = 'LOGIN_DONE';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const signup = (username, password) => ({
    type: 'SIGNUP',
    payload: {
        username,
        password
    }
});

export const login = (username, password, history) => ({
    type: 'LOGIN',
    payload: {
        username,
        password,
        history
    }
});

export const clearStatus = () => ({
    type: 'CLEAR_STATUS',
});

export const fetchInitialData = () => ({
    type: 'FETCH_INITIAL_DATA',
});

export const deleteDepartment = id => ({
    type: 'DELETE_DEPARTMENT',
    payload: {
        id
    }
});

export const deleteEmployee = id => ({
    type: 'DELETE_EMPLOYEE',
    payload: {
        id
    }
});

export const setDepartment = (id, name, history) => ({
    type: 'SET_DEPARTMENT',
    payload: {
        id,
        name,
        history,
    }
});

export const setEmployee = (departmentId, id, name, email, birthday, salary, history) => ({
    type: 'SET_EMPLOYEE',
    payload: {
        departmentId,
        id,
        name,
        email,
        birthday,
        salary,
        history,
    }
});
