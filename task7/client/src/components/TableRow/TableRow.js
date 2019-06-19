import React from 'react';
import PropTypes from 'prop-types';
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
		const { department_id: id, department_name: name } = this.props.department;
		return (
			<tr>
				<td>{id}</td>
				<td>{name}</td>
				<td>
					<Link to={`department?id=${id}`}>
						<span className="btn btn-secondary btn-block">
							edit
						</span>
					</Link>
				</td>
				<td>
					<button
						type="button"
						className="btn btn-secondary btn-block"
						itemRef={id}
						onClick={this.deleteDepartment}
					>
						delete
					</button>
				</td>
				<td>
					<Link to={`/employees-list?department=${id}`}>
						<span className="btn btn-secondary btn-block">
                            list
						</span>
					</Link>
				</td>
			</tr>
		);
	}
}

DepartmentTableRow.propTypes = {
	deleteDepartment: PropTypes.func,
	department: PropTypes.object,
};

export class EmployeeTableRow extends React.Component { //eslint-disable-line react/no-multi-comp
	constructor() {
		super();
		this.deleteEmployee = this.deleteEmployee.bind(this);
	}

	deleteEmployee(e) {
		const id = +e.target.getAttribute('itemref');
		this.props.deleteEmployee(id);
	}

	render() {
		const {
			id,
			name,
			email,
			birthday,
			salary,
			department_id: departmentId,
		} = this.props.employee;
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
					<button
						type="button"
						className="btn btn-secondary btn-block"
						itemRef={id}
						onClick={this.deleteEmployee}
					>
						delete
					</button>
				</td>
			</tr>
		);
	}
}

EmployeeTableRow.propTypes = {
	deleteEmployee: PropTypes.func,
	employee: PropTypes.object,
};
