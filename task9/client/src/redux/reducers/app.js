export function isLoading(state = true, action) {
    switch (action.type) {
        case 'PUT_DATA_TO_STORE':
            return false;
        default:
            return state;
    }
}

const failInitialState = {
    signup: false,
    login: false,
    department: false,
    employee: false
};
export function fail(state = failInitialState, action) {
    switch (action.type) {
        case 'SIGNUP_FAIL':
            return { ...state, signup: true };
        case 'LOGIN_FAIL':
            return { ...state, login: true };
        case 'SET_DEPARTMENT_FAIL':
            return { ...state, department: true };
        case 'SET_EMPLOYEE_FAIL':
            return { ...state, employee: true };
        case 'CLEAR_STATUS':
            return failInitialState;
        default:
            return state;
    }
}

export function addSuccess(state = { department: false, employee: false, user: false }, action) {
    switch (action.type) {
        case 'SIGNUP_DONE':
            return { ...state, user: true };
        case 'ADD_DEPARTMENT_DONE':
            return { ...state, department: true };
        case 'ADD_EMPLOYEE_DONE':
            return { ...state, employee: true };
        case 'CLEAR_STATUS':
            return { department: false, employee: false };
        default:
            return state;
    }
}

export function editSuccess(state = { department: false, employee: false }, action) {
    switch (action.type) {
        case 'EDIT_DEPARTMENT_DONE':
            return { ...state, department: true };
        case 'EDIT_EMPLOYEE_DONE':
            return { ...state, employee: true };
        case 'CLEAR_STATUS':
            return { department: false, employee: false };
        default:
            return state;
    }
}
