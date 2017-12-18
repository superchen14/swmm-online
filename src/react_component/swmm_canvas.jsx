import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Layer, Stage } from "react-konva";
import { setActiveIdAction } from "./actions";
import JunctionGraph from "./graph/junction_graph.jsx";
import OutfallGraph from "./graph/outfall_graph.jsx";
import ConduitGraph from "./graph/conduit_graph.jsx";
import SubcatchmentGraph from "./graph/subcatchment_graph.jsx";
import CONSTS from "./consts";

class SwmmCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {graphHelper, project, activeId, activeFeature, setActiveId} = this.props;
    const junctions = project.junctions || [];
    const outfalls = project.outfalls || [];
    const conduits = project.conduits || [];
    const subcatchments = project.subcatchments || [];

    const getJunctionGraph = junction => {
      const pt = graphHelper.getPointOnCanvas(junction.position);
      const isActive = activeId === junction.name && activeFeature === CONSTS.JUNCTION_FEATURE;
      return <JunctionGraph
                key={CONSTS.JUNCTION_GRAPH_ID_PREFIX + junction.name}
                x={pt.x}
                y ={pt.y}
                isActive={isActive}
                setActiveId={setActiveId(CONSTS.JUNCTION_FEATURE, junction.name)}
                />;
    };

    const getOutfallGraph = outfall => {
      const pt = graphHelper.getPointOnCanvas(outfall.position);
      const isActive = activeId === outfall.name && activeFeature === CONSTS.OUTFALL_FEATURE;
      return <OutfallGraph
                key={CONSTS.OUTFALL_GRAPH_ID_PREFIX + outfall.name}
                x={pt.x}
                y ={pt.y}
                isActive={isActive}
                setActiveId={setActiveId(CONSTS.OUTFALL_FEATURE, outfall.name)}
                />;
    };

    const getConduitGraph = conduit => {
      let pts = [conduit.inletNode.position].concat(conduit.vertices).concat(conduit.outletNode.position);
      pts = pts.map(pt => graphHelper.getPointOnCanvas(pt));
      const isActive = activeId === conduit.name && activeFeature === CONSTS.CONDUIT_FEATURE;
      return <ConduitGraph
                key={CONSTS.CONDUIT_GRAPH_ID_PREFIX + conduit.name}
                isActive={isActive}
                points={pts}
                setActiveId={setActiveId(CONSTS.CONDUIT_FEATURE, conduit.name)}
                />;
    };

    const getSubcatchmentGraph = subcatchment => {
      let pts = subcatchment.vertices;
      pts = pts.map(pt => graphHelper.getPointOnCanvas(pt));
      const isActive = activeId === subcatchment.name && activeFeature === CONSTS.SUBCATCHMENT_FEATURE;
      return <SubcatchmentGraph
                key={CONSTS.SUBCATCHMENT_GRAPH_ID_PREFIX + subcatchment.name}
                isActive={isActive}
                points={pts}
                setActiveId={setActiveId(CONSTS.SUBCATCHMENT_FEATURE, subcatchment.name)}
                />;
    };

    return (
      <Stage width={900} height={600}>
        <Layer>
          { subcatchments.map(getSubcatchmentGraph) }
          { junctions.map(getJunctionGraph) }
          { outfalls.map(getOutfallGraph) }
          { conduits.map(getConduitGraph) }
        </Layer>
      </Stage>
    );
  }
}

SwmmCanvas.propTypes = {
  project: PropTypes.object.isRequired,
  graphHelper: PropTypes.object.isRequired,
  activeId: PropTypes.string.isRequired,
  activeFeature: PropTypes.string.isRequired,
  setActiveId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  project: state && state.project ? state.project : {},
  graphHelper: state && state.graphHelper ? state.graphHelper : {},
  activeId: state && state.ui ? state.ui.activeId : "",
  activeFeature: state && state.ui ? state.ui.activeFeature : "",
});

const mapDispatchToProps = dispatch => ({
  setActiveId: (activeFeature, activeId) => () => dispatch(setActiveIdAction(activeFeature, activeId))
});

const ConnectedSwmmCanvas = connect(mapStateToProps, mapDispatchToProps)(SwmmCanvas);

export default ConnectedSwmmCanvas;