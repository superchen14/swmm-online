import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const keyNames = {
  numberOfBarrels: "Number of Barrels",
  maximumHeight: "Maximum Height",
  topWidth: "Top Width",
  bottomWidth: "Bottom Width",
  leftSlope: "Left Slope",
  rightSlope: "Right Slope",
};

const shapeMap = {
  CIRCULAR: "circular",
  TRIANGULAR: "triangular",
  PARABOLIC: "parabolic",
  EGG: "egg",
  HORSESHOE: "horse_shoe",
  SEMIELLIPTICAL: "semi_elliptical",
  BASKETHANDLE: "basket_handle",
  SEMICIRCULAR: "semi_circular",
  GOTHIC: "gothic",
  CATENARY: "catenary",
  TRAPEZOIDAL: "trapezoidal",
};

const SwmmConduitSectionModal = (props) => {
  const {section} = props;
  const imageURL = `/images/section/${shapeMap[section.shape]}.bmp`;

  const getProperties = section => {
    const numberOfBarrels = section.numberOfBarrels;
    const maximumHeight = section.maximumHeight;
    const topWidth = section.topWidth;
    const bottomWidth = section.bottomWidth;
    const leftSlope = section.leftSlope;
    const rightSlope = section.rightSlope;
    switch(section.shape) {
    case "CIRCULAR":
    case "EGG":
    case "HORSESHOE":
    case "SEMIELLIPTICAL":
    case "BASKETHANDLE":
    case "SEMICIRCULAR":
    case "GOTHIC":
    case "CATENARY":
      return {numberOfBarrels, maximumHeight};
    case "TRIANGULAR":
    case "PARABOLIC":
      return {numberOfBarrels, maximumHeight, topWidth};
    case "TRAPEZOIDAL":
      return {numberOfBarrels, maximumHeight, bottomWidth, leftSlope, rightSlope};
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