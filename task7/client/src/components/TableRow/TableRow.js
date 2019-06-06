import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class DepartmentTableRow extends React.Component {

    constructor() {
        super();
        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    deleteDepartment(e) {
        const id = +e.target.getAttribute('itemref');
        this.props.deleteDepartment(id);
    }

    render() {
        const { department_id: id, department_name } = this.props.department;
        return (
            <tr>
                <td>{id}</td>
                <td>{department_name}</td>
                <td>
                    <Link to={`department?id=${id}`}>
                    <span className="btn btn-secondary btn-block">
                        edit
                    </span>
                    </Link>
                </td>
                <td>
                    <span className="btn btn-secondary btn-block" itemRef={id} onClick={this.deleteDepartment}>delete</span>
                </td>
                <td>
                    <Link to={`/employees-list?department=${id}`}>
                        <span className="btn btn-secondary btn-block">
                            list
                        </span>
                    </Link>
                </td>
            </tr>
        )
    }
}

export class EmployeeTableRow extends React.Component {
    constructor() {
        super();
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(e) {
        const id = +e.target.getAttribute('itemref');
        this.props.deleteEmployee(id);
    }

    render() {
        const { id, name, email, birthday, salary, department_id: departmentId } = this.props.employee;
        const employeeBirthday = moment(birthday).format('YYYY-MM-DD');

        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{employeeBirthday}</td>
                <td>{salary}</td>
                <td>
                    <Link to={`/employee?department=${departmentId}&id=${id}`}>
                        <span className="btn btn-secondary btn-block">
                            edit
                        </span>
                    </Link>
                </td>
                <td>
                    <span className="btn btn-secondary btn-block" itemRef={id} onClick={this.deleteEmployee}>delete</span>
                </td>
            </tr>
        )
    }
}

