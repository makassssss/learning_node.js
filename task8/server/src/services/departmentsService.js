import models from '../models/index';
import Logger from '../logger/Logger';
import logToDB from '../logger/logToDB'; //eslint-disable-line import/no-cycle

const model = models.departments;

const error = (err) => {
    Logger.error(err);
    return {
        success: false,
        err: err.message
    }
};

export default class DepartmentsService {

    getDepartments = () => (
        model.findAll()
            .then(departments => {
                logToDB('get departments');
                return {
                    success: true,
                    departments
                }
            })
            .catch(error)
    );

    setDepartment = (name, id) => (
        id ? (
            model.update(
                {
                    department_name: name,
                },
                {
                    where: {
                        department_id: id,
                    }
                }
            )
                .then(() => {
                    logToDB('edit department');
                    return {
                        success: true,
                        id
                    }
                })
                .catch(error)
        ) : (
            model.create(
                {
                    department_name: name,
                    department_id: id,
                }
            )
                .then(department => {
                    logToDB('add department');
                    return {
                        success: true,
                        id: department.dataValues.department_id
                    }
                })
                .catch(error)
        )
    );

    deleteDepartment = (id) => (
        model.destroy({
            where: {
                department_id: id
            }
        })
            .then(() => {
                logToDB('delete department');
                return {
                    success: true
                }
            })
            .catch(error)
    );

}
