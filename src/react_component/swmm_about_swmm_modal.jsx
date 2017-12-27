import React from "react";
import PropTypes from 'prop-types';

const SwmmAboutSwmmModal = ({isActive, onClose}) => {
    const className = isActive ? "modal is-active" : "modal";
    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">About SWMM-Online</p>
            <button className="delete" aria-label="close" onClick={onClose}></button>
          </header>
          <section className="modal-card-body">
            <div className="content">
              <h1>What is SWMM-Online</h1>
              <p>This is a read-only online version of <a href="https://www.epa.gov/water-research/storm-water-management-model-swmm">Storm Water Management Model</a></p>
              <h1>Source Code</h1>
              <p>Will upload to github</p>
              <h1>Completion</h1>
              <p><progress className="progress is-large" value="10" max="100">10%</progress></p>
            </div>
          </section>
          <footer className="modal-card-foot">
          </footer>
        </div>
      </div>
    );
}

SwmmAboutSwmmModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SwmmAboutSwmmModal;