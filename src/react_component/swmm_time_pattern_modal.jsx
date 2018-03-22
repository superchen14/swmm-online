import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmTimePatternModal = props => {
  const {timePattern} = props;

  return (
    <SwmmModal {...props} title="Time Pattern" width={300}>
      {
        timePattern && 
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <tbody>
            <tr>
              <th className="normal-col">Name</th>
              <th className="normal-col">{timePattern.name}</th>
            </tr>
            <tr>
              <th className="normal-col">Type</th>
              <th className="normal-col">{timePattern.patternType}</th>
            </tr>
            <tr>
              <th className="normal-col">Multipliers</th>
              <th className="normal-col"></th>
            </tr>
          </tbody>
          {
            timePattern.patternType === "DAILY" &&
            <tbody>
              <tr>
                <th className="normal-col">Sun</th>
                <th className="normal-col">{timePattern.multipliers[0]}</th>
              </tr>
              <tr>
                <th className="normal-col">Mon</th>
                <th className="normal-col">{timePattern.multipliers[1]}</th>
              </tr>
              <tr>
                <th className="normal-col">TUE</th>
                <th className="normal-col">{timePattern.multipliers[2]}</th>
              </tr>
              <tr>
                <th className="normal-col">WED</th>
                <th className="normal-col">{timePattern.multipliers[3]}</th>
              </tr>
              <tr>
                <th className="normal-col">THU</th>
                <th className="normal-col">{timePattern.multipliers[4]}</th>
              </tr>
              <tr>
                <th className="normal-col">FRI</th>
                <th className="normal-col">{timePattern.multipliers[5]}</th>
              </tr>
              <tr>
                <th className="normal-col">SAT</th>
                <th className="normal-col">{timePattern.multipliers[6]}</th>
              </tr>
            </tbody>
          }
        </table>
      }
    </SwmmModal>
  );
};

SwmmTimePatternModal.propTypes = {
  timePattern: PropTypes.object
}

export default SwmmTimePatternModal;