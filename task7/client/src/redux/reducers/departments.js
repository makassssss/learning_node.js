export default function departments(state = [], action) {
	switch (action.type) {
		case 'PUT_DATA_TO_STORE':
			return [...action.departments];
		case 'DELETE_DEPARTMENT_DONE':
			return [...state.filter(department => department.department_id !== action.id)];
		case 'ADD_DEPARTMENT_DONE':
			const department = { department_id: action.id, department_name: action.name };
			return [...state, department];
		case 'EDIT_DEPARTMENT_DONE':
			const { id, name } = action;
			return [
				...state.filter(department => department.department_id !== id),
				{ department_id: id, department_name: name },
			];
		default:
			return state;
	}
}
