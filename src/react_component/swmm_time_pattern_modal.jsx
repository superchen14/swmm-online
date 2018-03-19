import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmTimePatternModal = props => {
  const {timePattern} = props;
  return (
    <SwmmModal {...props} title="Time Pattern" width={400}>
      {
        timePattern && 
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <thead>
            <tr><th>Property</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr>
              <th className="normal-col">Name</th>
              <th className="normal-col">{timePattern && timePattern.name}</th>
            </tr>
            <tr>
              <th className="normal-col">Type</th>
              <th className="normal-col">{timePattern && timePattern.patternType}</th>
            </tr>
          </tbody>
        </table>
      }
    </SwmmModal>
  );
};

SwmmTimePatternModal.propTypes = {
  timePattern: PropTypes.object
}

export default SwmmTimePatternModal;