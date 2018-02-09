import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmConduitSectionModal = (props) => {
  const {section} = props;

  return (
    <SwmmModal {...props} width={"400px"}>
    <div className="columns">
      <div className="column is-one-quarter"><img src="/images/section/circular.bmp" alt="Image"/></div>
      <div className="column">
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <tbody>
            <tr>
              <th className="property-col">{"Number of Barrels"}</th>
              <th className="value-col">{section.numberOfBarrels}</th>
            </tr>
            <tr>
              <th className="property-col">{"Maximum Height"}</th>
              <th className="value-col">{section.maximumHeight}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </SwmmModal>
  );
}

SwmmConduitSectionModal.propTypes = {
  section: PropTypes.object.isRequired,
}

export default SwmmConduitSectionModal;