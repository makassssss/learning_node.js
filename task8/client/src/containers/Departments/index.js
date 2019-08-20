import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { DepartmentTableRow } from '../../components/TableRow';

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const Departments = ({ departments, ...props }) => {
	const [sortName, setSortName] = useState('');
	const [sortOrder, setSortOrder] = useState(true);
	const handleSort = (name) => {
		setSortName(name);
		sortName === name ? setSortOrder(!sortOrder) : null;
	};
	return (
		<div className="departments">
			<header>
				<h3 className="my-4 text-center">Departments</h3>
			</header>
			<main>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th onClick={() => handleSort('department_id')}>
								ID
								<span className="float-right">
									{
										sortName === 'department_id'
											? <FontAwesomeIcon icon={sortOrder ? faSortUp : faSortDown} />
											: <FontAwesomeIcon color="darkgray" icon={faSort} />
									}
								</span>
							</th>
							<th onClick={() => handleSort('department_name')}>
								department name
								<span className="float-right">
									{
										sortName === 'department_name'
											? <FontAwesomeIcon icon={sortOrder ? faSortUp : faSortDown} />
											: <FontAwesomeIcon color="darkgray" icon={faSort} />
									}
								</span>
							</th>
							<th>edit</th>
							<th>delete</th>
							<th>list</th>
						</tr>
					</thead>
					<tbody>
						{
							departments.sort((a, b) => {
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
							}).map(department => (
								<DepartmentTableRow
									key={department.department_id}
									department={department}
									{...props}
								/>
							))
						}
						<tr>
							<td colSpan="2">
								<Link to="/department">
									<span className="btn btn-secondary btn-block">
										add department
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

Departments.propTypes = {
	departments: PropTypes.array,
};

export default connect(state => ({
	departments: state.departments,
}), mapDispatchToProps)(Departments);
