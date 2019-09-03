import express from 'express';
import EmployeesService from "../services/employeesService";

const router = express.Router();
const employeesService = new EmployeesService();

// Getting all existing employees

router.get('/employees', async(req, res) => {
    const result = await employeesService.getEmployees();
    res.send(result);
});

// Set employee

router.post('/set-employee', async (req, res) => {
	const {
		departmentId,
		id,
		name,
		email,
		birthday,
		salary,
	} = req.body;
	const result = await employeesService.setEmployee(id, name, email, birthday, salary, departmentId);
	res.send(result);
});

// Delete employee

router.post('/delete-employee', async (req, res) => {
    const { id } = req.body;
    const result = await employeesService.deleteEmployee(id);
    res.send(result);
});

export default router;
