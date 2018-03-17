import React from "react";
import PropTypes from 'prop-types';

const SwmmModal = ({title, isActive, onClose, width, children}) => {
  const className = isActive ? "modal is-active" : "modal";
  width = width ? width : 640;
  return (
    <div className={className}>
      <div className="modal-background"></div>
      <div className="modal-card" style={{width: width}}>
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot">
        </footer>
      </div>
    </div>
  );
};

SwmmModal.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  width: PropTypes.number,
}

export default SwmmModal;