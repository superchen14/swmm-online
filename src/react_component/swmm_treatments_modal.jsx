import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmTreatmentsModal = (props) => {
  const {treatments} = props;
  return (
    <SwmmModal {...props} title="Treatments">
      <table className="table is-hoverable is-bordered" id="swmm-property-list">
        <thead>
          <tr><th>Pollutant</th><th>Treatment Expression</th></tr>
        </thead>
        <tbody>
          {treatments.map(treatment => (
            <tr key={"Treatment" + treatment.pollutantName}>
              <th className="normal-col">{treatment.pollutantName}</th>
              <th className="normal-col">{treatment.expression}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </SwmmModal>
  );
}

SwmmTreatmentsModal.propTypes = {
  treatments: PropTypes.array.isRequired,
}

export default SwmmTreatmentsModal;