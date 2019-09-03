import express from 'express';
import DepartmentsService from "../services/departmentsService";

const router = express.Router();
const departmentsService = new DepartmentsService();

// Get all departments

router.get('/departments', async (req, res) => {
    const result = await departmentsService.getDepartments();
    res.send(result);
});

// Add or edit department

router.post('/set-department', async (req, res) => {
	const { id, name } = req.body;
	const result = await departmentsService.setDepartment(name, id);
	res.send(result);
});

// Delete department

router.post('/delete-department', async (req, res) => {
    const { id } = req.body;
    const result = await departmentsService.deleteDepartment(id);
    res.send(result);
});

export default router;
