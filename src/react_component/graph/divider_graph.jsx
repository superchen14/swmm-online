import React from "react";
import { RegularPolygon } from "react-konva";
import PropTypes from "prop-types";
import getGraphProps from "./graph_props";

class DividerGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {x, y, isActive, setActiveId} = this.props;
    let graphProps = getGraphProps(isActive);
    graphProps.sides = 4;
    graphProps.radius = 4;
    graphProps.onClick = setActiveId;
    graphProps.rotation = 180;
    graphProps.x = x;
    graphProps.y = y;
    return <RegularPolygon {...graphProps}/>;
  }
}

DividerGraph.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveId: PropTypes.func.isRequired,
}

export default DividerGraph;
