import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Portal from 'components/Portal';
import Modal from 'components/Modal';
import DeleteItemModal from 'components/DeleteItemModal';

export const DepartmentTableRow = ({ department, deleteDepartment }) => {
	const { department_id: id, department_name: name } = department;
	const [modalOpen, setModalOpen] = useState(false);
	return (
		<>
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
						onClick={() => setModalOpen(true)}
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
			<Portal open={modalOpen}>
				<Modal
                    size="sm"
                    handleClose={() => setModalOpen(false)}
                >
                    <DeleteItemModal
                        item="department"
                        id={id}
                        handleClose={() => setModalOpen(false)}
                        handleDelete={() => deleteDepartment(id)}
                    />
                </Modal>
			</Portal>
		</>
	);
};

DepartmentTableRow.propTypes = {
	deleteDepartment: PropTypes.func,
	department: PropTypes.object,
};

export const EmployeeTableRow = ({ employee, deleteEmployee }) => {
	const {
		id,
		name,
		email,
		birthday,
		salary,
		department_id: departmentId,
	} = employee;
	const employeeBirthday = moment(birthday).format('YYYY-MM-DD');
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
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
						onClick={() => setModalOpen(true)}
					>
						delete
					</button>
				</td>
			</tr>
			<Portal open={modalOpen}>
				<DeleteItemModal
                    size="sm"
					handleClose={() => setModalOpen(false)}
					handleDelete={() => deleteEmployee(id)}
				/>
			</Portal>
		</>
	);
};

EmployeeTableRow.propTypes = {
	deleteEmployee: PropTypes.func,
	employee: PropTypes.object,
};
