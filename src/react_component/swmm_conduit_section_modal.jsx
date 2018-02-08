import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmConduitSectionModal = (props) => {
  const {section} = props;
  return (
    <SwmmModal {...props}>
      <table className="table is-hoverable is-bordered" id="swmm-property-list">
      </table>
    </SwmmModal>
  );
}

SwmmConduitSectionModal.propTypes = {
  section: PropTypes.object.isRequired,
}

export default SwmmConduitSectionModal;