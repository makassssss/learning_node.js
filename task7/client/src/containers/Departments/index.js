import React from 'react';
import { Link } from 'react-router-dom';
import { DepartmentTableRow } from '../../components/TableRow/TableRow';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actionCreators, dispatch);
};

const Departments = ({ departments, ...props }) => {

	return (
		<div className="departments">
			<header>
				<h3 className="my-4 text-center">Departments</h3>
			</header>
			<main>
				<table className="table table-bordered">
					<thead>
					<tr>
						<th>ID</th>
						<th>department name</th>
						<th>edit</th>
						<th>delete</th>
						<th>list</th>
					</tr>
					</thead>
					<tbody>
					{
						departments.sort((a, b) => a.department_id - b.department_id).map(department =>
							<DepartmentTableRow
								key={department.department_id}
								department={department}
								{...props}
							/>
						)
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

export default connect(state => ({
	departments: state.departments,
}), mapDispatchToProps)(Departments);
