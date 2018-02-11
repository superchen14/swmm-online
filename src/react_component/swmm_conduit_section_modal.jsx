import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const keyNames = {
  numberOfBarrels: "Number of Barrels",
  maximumHeight: "Maximum Height",
  topWidth: "Top Width",
};

const shapeMap = {
  CIRCULAR: "circular",
  TRIANGULAR: "triangular",
  PARABOLIC: "parabolic",
  EGG: "egg",
  HORSESHOE: "horse_shoe",
};

const SwmmConduitSectionModal = (props) => {
  const {section} = props;
  const imageURL = `/images/section/${shapeMap[section.shape]}.bmp`;

  const getProperties = section => {
    const numberOfBarrels = section.numberOfBarrels;
    const maximumHeight = section.maximumHeight;
    const topWidth = section.topWidth;
    switch(section.shape) {
    case "CIRCULAR":
    case "EGG":
    case "HORSESHOE":
      return {numberOfBarrels, maximumHeight};
    case "TRIANGULAR":
    case "PARABOLIC":
      return {numberOfBarrels, maximumHeight, topWidth};
    default:
      return {};
    }
  }

  const toHtml = properties => {
    return Object.keys(properties).map(key =>
      <tr key={key}>
        <th className="property-col">{keyNames[key]}</th>
        <th className="value-col">{properties[key]}</th>
      </tr>
    );
  }

  return (
    <SwmmModal {...props} width={400}>
    <div className="columns">
      <div className="column is-one-quarter"><img src={imageURL}/></div>
      <div className="column">
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <tbody>{toHtml(getProperties(section))}</tbody>
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