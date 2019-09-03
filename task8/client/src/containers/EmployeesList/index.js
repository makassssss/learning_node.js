import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as url from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { EmployeeTableRow } from '../../components/TableRow';

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);
const mapStateToProps = state => ({
	departments: state.departments,
	employees: state.employees,
});

const EmployeesList = ({ employees, departments, ...props }) => {
	const departmentId = +url.parse(window.location.search).department;
	let departmentName = '';
	departments.forEach((department) => {
		department.department_id === departmentId ? departmentName = department.department_name : null;
	});
	const [sortName, setSortName] = useState('');
	const [sortOrder, setSortOrder] = useState(true);
	const handleSort = (name) => {
		setSortName(name);
		sortName === name ? setSortOrder(!sortOrder) : null;
	};

	return (
		<div className="employees-list">
			<header>
				<Link to="/departments" className="float-left">
					{/* eslint-disable-next-line quotes */}
					<span className="btn btn-secondary btn-block back"> {`<`}</span>
				</Link>
				<h3 className="my-4 text-center">employees list of {departmentName}</h3>
			</header>
			<main>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th onClick={() => handleSort('id')}>
								ID
								<span className="float-right">
									{
										sortName === 'id'
											? <FontAwesomeIcon icon={sortOrder ? faSortUp : faSortDown} />
											: <FontAwesomeIcon color="darkgray" icon={faSort} />
									}
								</span>
							</th>
							<th onClick={() => handleSort('name')}>
								ID
								<span className="float-right">
									{
										sortName === 'name'
											? <FontAwesomeIcon icon={sortOrder ? faSortUp : faSortDown} />
											: <FontAwesomeIcon color="darkgray" icon={faSort} />
									}
								</span>
							</th>
							<th>email</th>
							<th>birthday</th>
							<th>salary</th>
							<th>edit</th>
							<th>delete</th>
						</tr>
					</thead>
					<tbody>
						{
							employees.sort((a, b) => {
								if (sortOrder) {
									if (a[sortName] < b[sortName]) {
										return -1;
									} else if (a[sortName] > b[sortName]) { //eslint-disable-line no-else-return
										return 1;
									}
									return 0;
								}
								if (a[sortName] > b[sortName]) {
									return -1;
								} else if (a[sortName] < b[sortName]) { //eslint-disable-line no-else-return
									return 1;
								}
								return 0;
							}).map(employee => (
								employee.department_id === departmentId && (
									<EmployeeTableRow
                                        key={employee.id}
                                        employee={employee}
                                        {...props}
                                    />
								)
							))
						}
						<tr>
							<td colSpan="2">
								<Link to={`/employee?department=${departmentId}`}>
									<span className="btn btn-secondary btn-block">
										add employee
									</span>
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</main>
		</div>
	);
};

EmployeesList.propTypes = {
	employees: PropTypes.array,
	departments: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
