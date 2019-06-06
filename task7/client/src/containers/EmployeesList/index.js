import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { EmployeeTableRow } from '../../components/TableRow/TableRow';
import  * as url from 'query-string';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

class EmployeesList extends React.Component {

    render() {
        const { employees, departments } = this.props;
        const departmentId = +url.parse(window.location.search).department;
        let departmentName = '';
        departments.forEach(department => {
             department.department_id === departmentId ? departmentName = department.department_name : null
        });

        return (
            <div className="employees-list">
                <header>
                    <Link to="/departments" className="float-left">
                        <span className="btn btn-secondary btn-block back"> {`<`}</span>
                        </Link>
                    <h3 className="my-4 text-center">employees list of {departmentName}</h3>
                </header>
                <main>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>name</th>
                            <th>email</th>
                            <th>birthday</th>
                            <th>salary</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            employees.sort((a, b) => a.id - b.id).map(employee => {
                               if(employee.department_id === departmentId) {
                                   return <EmployeeTableRow key={employee.id} employee={employee} {...this.props}/>
                               }
                            })
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
        )
    }
}

export default connect(
	state => ({
		departments: state.departments,
		employees: state.employees
	}), mapDispatchToProps
)(EmployeesList);
