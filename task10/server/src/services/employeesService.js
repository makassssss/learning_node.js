import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB'; //eslint-disable-line import/no-cycle

const model = models.employees;

const error = (err) => {
    Logger.error(err);
    return {
        success: false,
        err: err.message
    }
};

export default class EmployeesService {

    getEmployees = () => (
        model.findAll()
            .then(employees => {
                logToDB('get employees');
                return {
                    success: true,
                    employees
                }
            })
            .catch(error)
    );

    setEmployee = (id, name, email, birthday, salary, departmentId) => (
        id ? (
            model.update({
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
            model.create(
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
    );

    deleteEmployee = (id) => (
        model.destroy({
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
    );

}
