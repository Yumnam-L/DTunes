import React from 'react';
import './Modal.css'; // Add your modal styles here

const Modal = ({ closeModal, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
