import React from 'react';
import PropTypes from 'prop-types';
import * as url from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';

const mapStateToProps = state => ({
	departments: state.departments,
	fail: state.fail.department,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

class Department extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			departmentName: '',
			departmentId: +url.parse(window.location.search).id,
		};
	}

	componentDidMount() {
		const { departmentId } = this.state;
		const { departments } = this.props;
		if (departmentId) {
			departments.forEach((department) => {
				if (department.department_id === departmentId) {
					this.setState({
						departmentName: department.department_name,
					});
				}
			});
		}
	}

	handleDepartmentNameChange = (e) => {
		e.preventDefault();
		this.setState({
			departmentName: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { departmentId, departmentName } = this.state;
		this.props.setDepartment(departmentId, departmentName, this.props.history);
	};


	render() {
		const { departmentId, departmentName } = this.state;
		const { fail } = this.props;
		return (
			<div className="department">
				<header>
					<h3 className="my-4 text-center">
						{
							departmentId
								? 'Edit department'
								: 'Add new department'
						}
					</h3>
				</header>
				<main>
					<form className="mx-auto w-25" id="form" onSubmit={this.handleSubmit}>
						<input
							type="hidden"
							className="form-control"
							id="id"
							name="id"
							defaultValue={departmentId.toString()}
						/>
						<div className="form-group">
							{/*eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
							<label htmlFor="name">department name *</label>
							{
								fail && (
									<span className="validation not-unique pl-4">Value must be unique</span>
								)
							}
							<input
								required
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={departmentName}
								onChange={this.handleDepartmentNameChange}
							/>
						</div>
						<div>
							<input
								type="submit"
								className="btn btn-secondary float-right"
								value="Save"
							/>
							<Link to="/departments">
								{/*eslint-disable-next-line quotes*/}
								<span className="btn btn-secondary">{`<`}</span>
							</Link>
						</div>
					</form>
				</main>
			</div>
		);
	}
}

Department.propTypes = {
	departments: PropTypes.array,
	setDepartment: PropTypes.func,
	fail: PropTypes.bool,
	history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
