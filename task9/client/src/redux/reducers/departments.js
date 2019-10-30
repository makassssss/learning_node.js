export default function departments(state = [], action) {
	switch (action.type) {
		case 'PUT_DATA_TO_STORE':
			return [...action.departments];
		case 'DELETE_DEPARTMENT_DONE':
			return [...state.filter(department => department.department_id !== action.id)];
		case 'SET_DEPARTMENT_DONE':
			return [
				...state.filter(department => department.department_id !== action.id),
				{ department_id: action.id, department_name: action.name },
			];
		default:
			return state;
	}
}
