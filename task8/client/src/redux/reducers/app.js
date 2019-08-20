export function isLoading(state = true, action) {
	switch (action.type) {
		case 'PUT_DATA_TO_STORE':
			return false;
		default:
			return state;
	}
}

export function fail(state = { department: false, employee: false }, action) {
	switch (action.type) {
		case 'SET_DEPARTMENT_FAIL':
			return { ...state, department: true };
		case 'SET_EMPLOYEE_FAIL':
			return { ...state, employee: true };
		case 'CLEAR_STATUS':
			return { department: false, employee: false };
		default:
			return state;
	}
}

export function addSuccess(state = { department: false, employee: false }, action) {
	switch (action.type) {
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
