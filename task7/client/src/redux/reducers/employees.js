export default function employees(state = [], action) {
	const employee = {
		id: action.id,
		name: action.name,
		email: action.email,
		birthday: action.birthday,
		salary: action.salary,
		department_id: action.departmentId,
	};
	switch (action.type) {
		case 'PUT_DATA_TO_STORE':
			return [...action.employees];
		case 'DELETE_EMPLOYEE_DONE':
			return [...state.filter(i => i.id !== action.id)];
		case 'SET_EMPLOYEE_DONE':
			return [...state.filter(i => i.id !== action.id), employee];
		default:
			return state;
	}
}
