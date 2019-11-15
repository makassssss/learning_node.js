import React from 'react';
import PropTypes from 'prop-types';

const handleClick = (handleClose, handleDelete) => {
	handleDelete ? handleDelete() : null;
	handleClose();
};

const DeleteItemModal = ({ handleClose, handleDelete }) => (
    <div>
        <div className="modal-body text-center">
            Are you sure?
        </div>
        <div className="modal-footer">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleClick(handleClose)}
            >
                No
            </button>
            <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => handleClick(handleClose, handleDelete)}
            >
                Yes
            </button>
        </div>
    </div>
);

DeleteItemModal.propTypes = {
	handleClose: PropTypes.func,
	handleDelete: PropTypes.func,
};

export default DeleteItemModal;
