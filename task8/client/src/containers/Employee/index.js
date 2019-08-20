import React from 'react';
import PropTypes from 'prop-types';
import * as url from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as actionCreators from '../../redux/actions/actionCreators';

const mapStateToProps = state => ({
	employees: state.employees,
	fail: state.fail.employee,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

class Employee extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			department: +url.parse(window.location.search).department,
			id: +url.parse(window.location.search).id,
			name: '',
			email: '',
			birthday: '',
			salary: '',
			error: {
				invalidDate: false,
			},
		};
	}

	componentDidMount() {
		const { employees } = this.props;
		const { id } = this.state;
		if (id) {
			employees.forEach((employee) => {
				if (employee.id === id) {
					this.setState({
						name: employee.name,
						email: employee.email,
						birthday: moment(employee.birthday).format('YYYY-MM-DD'),
						salary: employee.salary,
					});
				}
			});
		}
	}

	handleInputChange = (field, e) => {
		e.preventDefault();
		this.setState({
			[field]: e.target.value,
		});
	};

	validateDate = (date) => {
		const re = /(\d{4})-(\d{2})-(\d{2})/;
		this.setState({
			error: {
				invalidDate: !re.test(date),
			},
		});
		return re.test(date);
	};

	validateForm = () => {
		const { birthday } = this.state;
		return this.validateDate(birthday);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			id,
			department,
			name,
			email,
			birthday,
			salary,
		} = this.state;
		const isValid = this.validateForm();
		isValid
			? this.props.setEmployee(department, id, name, email, birthday, salary, this.props.history)
			: null;
	};

	render() {
		const { fail } = this.props;
		const {
			id,
			department,
			name,
			email,
			birthday,
			salary,
			error,
		} = this.state;

		return (
			<div className="employee">
				<header>
					<h3 className="my-4 text-center">
						{
							id ? 'Edit employee info' : 'Add new employee'
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
							defaultValue={id.toString()}
						/>
						<input
							type="hidden"
							className="form-control"
							id="department"
							name="department"
							defaultValue={department.toString()}
						/>
						<div className="form-group">
							{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
							<label htmlFor="name">name *</label>
							<input
								required
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={name}
								onChange={e => this.handleInputChange('name', e)}
							/>
						</div>
						<div className="form-group">
							{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
							<label htmlFor="email">email *</label>
							{
								fail && (
									<span className="validation not-unique pl-4">Value must be unique</span>
								)
							}
							<input
								required
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={email}
								onChange={e => this.handleInputChange('email', e)}
							/>
						</div>
						<div className="form-group">
							{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
							<label htmlFor="birthday">birthday *</label>
							{
								error.invalidDate && (
									<span className="validation invalid pl-4">date format yyyy-mm-dd</span>
								)
							}
							<input
								required
								type="text"
								className="form-control"
								id="birthday"
								name="birthday"
								value={birthday}
								onChange={e => this.handleInputChange('birthday', e)}
							/>
						</div>
						<div className="form-group">
							{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
							<label htmlFor="salary">salary *</label>
							<input
								required
								type="number"
								className="form-control"
								id="salary"
								name="salary"
								value={salary}
								onChange={e => this.handleInputChange('salary', e)}
							/>
						</div>
						<div>
							<input
								type="submit"
								className="btn btn-secondary float-right"
								value="Save"
							/>
							<Link to={`/employees-list?department=${department}`}>
								{/* eslint-disable-next-line quotes */}
								<span className="btn btn-secondary">{`<`}</span>
							</Link>
						</div>
					</form>
				</main>
			</div>
		);
	}
}

Employee.propTypes = {
	employees: PropTypes.array,
	setEmployee: PropTypes.func,
	fail: PropTypes.bool,
	history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
