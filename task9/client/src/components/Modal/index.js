import React from 'react';

const Modal = ({ handleClose, size, children }) => (
    <div className="modal">
        <div className={`modal-dialog modal-${size}`} role="document">
            <div className="modal-content">
                <button onClick={handleClose} type="button" className="close position-absolute mr-3 mt-2">
                    <span aria-hidden="true">&times;</span>
                </button>
                {children}
            </div>
        </div>
    </div>
);

export default Modal;