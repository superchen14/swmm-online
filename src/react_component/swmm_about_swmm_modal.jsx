import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmAboutSwmmModal = (props) => {
  return (
    <SwmmModal {...props}>
      <div className="content">
        <h1>What is SWMM-Online</h1>
        <p>This is a read-only online version of <a href="https://www.epa.gov/water-research/storm-water-management-model-swmm">Storm Water Management Model</a></p>
        <h1>Source Code</h1>
        <p><a href="https://github.com/superchen14/swmm-online">https://github.com/superchen14/swmm-online</a></p>
        <h1>Completion</h1>
        <p><progress className="progress is-large" value="10" max="100">10%</progress></p>
      </div>
    </SwmmModal>
  );
}

SwmmAboutSwmmModal.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SwmmAboutSwmmModal;