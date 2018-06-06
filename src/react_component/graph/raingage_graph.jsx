import React from "react";
import { Image } from "react-konva";
import PropTypes from 'prop-types';

class RainGageGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: null};
  }

  render() {
    const {x, y} = this.props;
    return <Image image={this.state.image} x={x} y={y}/>;
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
}

export default RainGageGraph;