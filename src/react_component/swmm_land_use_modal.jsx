import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmLandUseModal = props => {
  const {landUse} = props;
  return (
    <SwmmModal {...props} title="Land Use" width={350}>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li className="is-active"><a><span>General</span></a></li>
          <li><a><span>Buildup</span></a></li>
          <li><a><span>WashOff</span></a></li>
        </ul>
      </div>
      {
        landUse && 
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <thead>
            <tr><th>Property</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr>
              <th className="normal-col">Name</th>
              <th className="normal-col">{landUse.name}</th>
            </tr>
          </tbody>
        </table>
      }
    </SwmmModal>
  );
};

SwmmLandUseModal.propTypes = {
  landUse: PropTypes.object
}

export default SwmmLandUseModal;