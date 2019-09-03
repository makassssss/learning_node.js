import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB'; //eslint-disable-line import/no-cycle

const error = (err) => {
    Logger.error(err);
    return {
        success: false,
        err: err.message
    }
} ;

export default class EmployeesService {
    async getEmployees() {
        return await models.employees.findAll()
            .then(employees => {
                logToDB('get employees');
                return {
                    success: true,
                    employees
                }
            })
            .catch(error)
    }

    async setEmployee(id, name, email, birthday, salary, departmentId) {
        return id ? (
            await models.employees.update({
                    name,
                    email,
                    birthday,
                    salary,
                },
                {
                    where: {
                        id
                    }
                }
            )
                .then(() => {
                    logToDB('edit employee');
                    return {
                        success: true,
                        id
                    }
                })
                .catch(error)
        ) : (
            await models.employees.create(
                {
                    name,
                    email,
                    birthday,
                    salary,
                    department_id: departmentId,
                }
            )
                .then(employee => {
                    console.log(employee);
                    logToDB('add employee');
                    return {
                        success: true,
                        id: employee.dataValues.id
                    }
                })
                .catch(error)
        )
    }

    async deleteEmployee(id) {
        return await models.employees.destroy({
            where: {
                id
            }
        })
            .then(() => {
                logToDB('delete employee');
                return {
                    success: true
                }
            })
            .catch(error)
    }
}
