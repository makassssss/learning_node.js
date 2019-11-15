import app from '../../app';
import models from '../../models/index';
import DepartmentsService from '../../services/departmentsService';

describe('DepartmentsService', () => {

    const departmentService = new DepartmentsService();

    it('should get all departments', async () => {
        const departments = await models.departments.findAll({
            raw: true
        });
        const result = (await departmentService.getDepartments()).departments;
        expect(result.length === departments.length).toBe(true);
    });

    it('should add new department', async () => {
        await departmentService.setDepartment('test');
        const result = await models.departments.findOne({
            raw: true,
            where: {
                department_name: 'test'
            }
        });
        expect(result).not.toBeNull();
    });

    it('should not add department with non-unique name', async () => {
        const result = (await departmentService.setDepartment('test')).success;
        expect(result).toBe(false);
    });

    it('should modify department name', async () => {
        const id = await models.departments.findOne({
            raw: true,
            where: {
                department_name: 'test'
            }
        })
            .then(department => department.department_id);
        await departmentService.setDepartment('modifiedTestName', id);
        const newNameExists = await models.departments.findOne({
            raw: true,
            where: {
                department_name: 'modifiedTestName'
            }
        });
        const oldNameExists = await models.departments.findOne({
            raw: true,
            where: {
                department_name: 'test'
            }
        });

        expect(newNameExists).not.toBeNull();
        expect(oldNameExists).toBeNull();
    });

    it('should delete department', async () => {
        const id = await models.departments.findOne({
            raw: true,
            where: {
                department_name: 'modifiedTestName'
            }
        })
            .then(department => department.department_id);
        const result = (await departmentService.deleteDepartment(id)).success;
        expect(result).toBe(true);
    });
});
