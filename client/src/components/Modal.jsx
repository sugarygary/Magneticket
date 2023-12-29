import React, { useState } from 'react';

const Modal = ({ children, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose(); // Call the onClose callback if provided
  };

  return (
    <div className={`modal-container ${isOpen ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;