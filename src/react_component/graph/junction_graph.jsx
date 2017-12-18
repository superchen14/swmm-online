import React from "react";
import { Circle } from "react-konva";
import PropTypes from 'prop-types';
import getGraphProps from "./graph_props";

class JunctionGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {x, y, isActive, setActiveId} = this.props;
    let graphProps = getGraphProps(isActive);
    graphProps.radius = 3;
    graphProps.onClick = setActiveId;
    graphProps.x = x;
    graphProps.y = y;
    return <Circle {...graphProps}/>;
  }
}

JunctionGraph.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveId: PropTypes.func.isRequired,
}

export default JunctionGraph;