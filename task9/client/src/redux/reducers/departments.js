export default function departments(state = [], action) {
    switch (action.type) {
        case 'PUT_DATA_TO_STORE':
            return [...action.payload.departments];
        case 'DELETE_DEPARTMENT_DONE':
            return [...state.filter(department => department.department_id !== action.payload.id)];
        case 'SET_DEPARTMENT_DONE':
            const { id, name } = action.payload;
            return [
                ...state.filter(department => department.department_id !== id),
                { department_id: id, department_name: name },
            ];
        default:
            return state;
    }
}
