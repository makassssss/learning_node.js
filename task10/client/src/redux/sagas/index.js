import {
	put,
	call,
	all,
	takeLatest,
	delay,
} from 'redux-saga/effects';
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
    SIGNUP,
    SIGNUP_DONE,
    SIGNUP_FAIL,
    LOGIN,
    LOGIN_FAIL,
} from '../actions/actionCreators';
import apiCall from 'API';

function* signup(action) {
    const { username, password } = action.payload;
    const result = yield call(() => apiCall('signup', 'POST', { username, password }, true));
    const { success, err } = result;
    if (success) {
        yield put({
            type: SIGNUP_DONE
        });
        yield delay(2000);
        yield put({ type: CLEAR_STATUS });
    } else {
        yield put({
            type: SIGNUP_FAIL,
            payload: {
                err
            }
        });
        yield delay(2000);
        yield put({ type: CLEAR_STATUS });
    }
}

function* login(action) {
    const { username, password, history } = action.payload;
    const result = yield call(() => apiCall('login', 'POST', { username, password}, true));
    const { success, err, token } = result;
    if (success) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        yield put({
            type: FETCH_INITIAL_DATA,
        });
        history.push('/');

    } else {
        yield put({
            type: LOGIN_FAIL,
            payload: {
                err
            }
        });
        yield delay(2000);
        yield put({ type: CLEAR_STATUS });
    }
}

function* getData() {
    const departmentsResData = yield call(() => apiCall('departments'));
    const employeesResData = yield call(() => apiCall('employees'));
    yield put({
        type: PUT_DATA_TO_STORE,
        payload: {
            departments: departmentsResData.departments,
            employees: employeesResData.employees,
        }
    });
}

function* setDepartment(action) {
    const { id, name, history } = action.payload;
    const result = yield call(() => apiCall('setDepartment', 'POST', { id, name }));
    const { success, err } = result;
    if (success) {
        yield put({
            type: SET_DEPARTMENT_DONE,
            payload: {
                id: result.id,
                name
            }
        });
        history.push('/');
    } else {
        yield put({
            type: SET_DEPARTMENT_FAIL,
            payload: {
                err
            }
        });
        yield delay(2000);
        yield put({ type: CLEAR_STATUS });
    }
}

function* deleteDepartment(action) {
    const { id } = action.payload;
    const result = yield call(() => apiCall('deleteDepartment', 'POST', { id }));
    const { success } = result;
    if (success) {
        yield put({
            type: DELETE_DEPARTMENT_DONE,
            payload: {
                id
            }
        });
    }
}

function* setEmployee(action) {
    const {
        departmentId,
        id,
        name,
        email,
        birthday,
        salary,
        history,
    } = action;
    const result = yield call(() => apiCall('setEmployee', 'POST', {
        departmentId,
        id,
        name,
        email,
        birthday,
        salary,
    }));
    const { success, err } = result;
    if (success) {
        yield put({
            type: SET_EMPLOYEE_DONE,
            payload: {
                departmentId,
                id: result.id,
                name,
                email,
                birthday,
                salary,
            }
        });
        history.push(`/employees-list?department=${departmentId}`);
    } else {
        yield put({
            type: SET_EMPLOYEE_FAIL,
            payload: {
                err
            }
        });
        yield delay(2000);
        yield put({ type: CLEAR_STATUS });
    }
}

function* deleteEmployee(action) {
    const { id } = action;
    yield call(() => apiCall('deleteEmployee', 'POST', { id }));
    yield put({
        type: DELETE_EMPLOYEE_DONE,
        payload: {
            id
        }
    });
}

export default function* rootSaga() {
    yield all([
        takeLatest(SIGNUP, signup),
        takeLatest(LOGIN, login),
        takeLatest(FETCH_INITIAL_DATA, getData),
        takeLatest(SET_DEPARTMENT, setDepartment),
        takeLatest(DELETE_DEPARTMENT, deleteDepartment),
        takeLatest(SET_EMPLOYEE, setEmployee),
        takeLatest(DELETE_EMPLOYEE, deleteEmployee),
    ]);
}
