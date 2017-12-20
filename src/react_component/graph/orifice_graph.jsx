import React from "react";
import { Line } from "react-konva";
import PropTypes from 'prop-types';
import getGraphProps from "./graph_props";

class OrificeGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isActive, setActiveId, points} = this.props;
    let graphProps = getGraphProps(isActive);
    const xyArray = points.reduce((acc, cur) => acc.concat([cur.x, cur.y]), []);
    graphProps.points = xyArray;
    graphProps.onClick = setActiveId;
    graphProps.scale = 1; // overwrite scale gotten from getGraphProps
    return <Line {...graphProps}/>;
  }
}

OrificeGraph.propTypes = {
  points: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveId: PropTypes.func.isRequired,
}

export default OrificeGraph;