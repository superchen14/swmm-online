import React from "react";
import { Group, Rect, Line } from "react-konva";
import PropTypes from "prop-types";
import getGraphProps from "./graph_props";

class StorageGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {x, y, isActive, setActiveId} = this.props;
    const rectWidth = 15;
    const rectHeight = 8;
    const lineHeight = 4;
    x = x - rectWidth / 2.0;
    y = y - rectHeight / 2.0;

    let rectProps = getGraphProps(isActive);
    rectProps.width = rectWidth;
    rectProps.height = rectHeight;
    rectProps.onClick = setActiveId;
    rectProps.x = x;
    rectProps.y = y;
    rectProps.scale = 1;
    rectProps.strokeWidth = 1;

    let lineProps1 = getGraphProps(isActive);
    lineProps1.points = [x, y, x, y - lineHeight];
    lineProps1.scale = 1;
    lineProps1.strokeWidth = 1;
    let lineProps2 = getGraphProps(isActive);
    lineProps2.points = [x + rectWidth, y, x + rectWidth, y - lineHeight];
    lineProps2.scale = 1;
    lineProps2.strokeWidth = 1;
    return (<Group>
              <Line {...lineProps1}/>
              <Rect {...rectProps}/>
              <Line {...lineProps2}/>
            </Group>);
  }
}

StorageGraph.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveId: PropTypes.func.isRequired,
}

export default StorageGraph;
