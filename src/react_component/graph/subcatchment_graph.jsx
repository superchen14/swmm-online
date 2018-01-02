import React from "react";
import { Group, Line } from "react-konva";
import PropTypes from 'prop-types';
import getGraphProps from "./graph_props";

class SubcatchmentGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isActive, setActiveId, points, centerPt, outletPt} = this.props;
    let graphProps = getGraphProps(isActive);
    const xyArray = points.reduce((acc, cur) => acc.concat([cur.x, cur.y]), []);
    graphProps.points = xyArray;
    graphProps.onClick = setActiveId;
    graphProps.scale = 1; // overwrite scale gotten from getGraphProps
    graphProps.closed = true;
    graphProps.fill = "transparent";

    let outletLineProps = getGraphProps(isActive);
    outletLineProps.points = [centerPt.x, centerPt.y, outletPt.x, outletPt.y];
    outletLineProps.scale = 1; // overwrite scale gotten from getGraphProps
    outletLineProps.dash = [10, 5];
    return (
      <Group>
        <Line {...graphProps}/>
        <Line {...outletLineProps}/>
      </Group>
    );
  }
}

SubcatchmentGraph.propTypes = {
  centerPt: PropTypes.object.isRequired,
  outletPt: PropTypes.object.isRequired,
  points: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveId: PropTypes.func.isRequired,
}

export default SubcatchmentGraph;