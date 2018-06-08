import React from "react";
import { Group, Rect, Image } from "react-konva";
import PropTypes from 'prop-types';
import getGraphProps from "./graph_props";

class RainGageGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: null};
  }

  render() {
    const {x, y, isActive, setActiveId} = this.props;
    let rectProps = getGraphProps(true);
    rectProps.width = 33;
    rectProps.height = 33;
    rectProps.x = x;
    rectProps.y = y;
    rectProps.scale = 1;
    rectProps.fill = "transparent";
    return (
      <Group>
        {isActive && <Rect {...rectProps}/>}
        <Image image={this.state.image} x={x} y={y} onClick={setActiveId}/>
      </Group>);
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = "/images/raingage.png";
    image.onload = () => { this.setState({image}); }
  }
}

RainGageGraph.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  setActiveId: PropTypes.func.isRequired
}

export default RainGageGraph;