import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Layer, Stage } from "react-konva";
import { setActiveIdAction } from "./actions";
import JunctionGraph from "./graph/junction_graph.jsx";
import OutfallGraph from "./graph/outfall_graph.jsx";
import DividerGraph from "./graph/divider_graph.jsx";
import StorageGraph from "./graph/storage_graph.jsx";
import ConduitGraph from "./graph/conduit_graph.jsx";
import PumpGraph from "./graph/pump_graph.jsx";
import OrificeGraph from "./graph/orifice_graph.jsx";
import WeirGraph from "./graph/weir_graph.jsx";
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
    const dividers = project.dividers || [];
    const storages = project.storages || [];
    const conduits = project.conduits || [];
    const pumps = project.pumps || [];
    const orifices = project.orifices || [];
    const weirs = project.weirs || [];
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

    const getDividerGraph = divider => {
      const pt = graphHelper.getPointOnCanvas(divider.position);
      const isActive = activeId === divider.name && activeFeature === CONSTS.DIVIDER_FEATURE;
      return <DividerGraph
                key={CONSTS.DIVIDER_GRAPH_ID_PREFIX + divider.name}
                x={pt.x}
                y ={pt.y}
                isActive={isActive}
                setActiveId={setActiveId(CONSTS.DIVIDER_FEATURE, divider.name)}
                />;
    };

    const getStorageGraph = storage => {
      const pt = graphHelper.getPointOnCanvas(storage.position);
      const isActive = activeId === storage.name && activeFeature === CONSTS.STORAGE_FEATURE;
      return <StorageGraph
                key={CONSTS.STORAGE_GRAPH_ID_PREFIX + storage.name}
                x={pt.x}
                y ={pt.y}
                isActive={isActive}
                setActiveId={setActiveId(CONSTS.STORAGE_FEATURE, storage.name)}
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

    const getPumpGraph = pump => {
      let pts = [pump.inletNode.position].concat(pump.vertices).concat(pump.outletNode.position);
      pts = pts.map(pt => graphHelper.getPointOnCanvas(pt));
      const isActive = activeId === pump.name && activeFeature === CONSTS.PUMP_FEATURE;
      return <PumpGraph
                key={CONSTS.PUMP_GRAPH_ID_PREFIX + pump.name}
                isActive={isActive}
                points={pts}
                setActiveId={setActiveId(CONSTS.PUMP_FEATURE, pump.name)}
                />;
    };

    const getOrificeGraph = orifice => {
      let pts = [orifice.inletNode.position].concat(orifice.vertices).concat(orifice.outletNode.position);
      pts = pts.map(pt => graphHelper.getPointOnCanvas(pt));
      const isActive = activeId === orifice.name && activeFeature === CONSTS.ORIFICE_FEATURE;
      return <OrificeGraph
                key={CONSTS.ORIFICE_GRAPH_ID_PREFIX + orifice.name}
                isActive={isActive}
                points={pts}
                setActiveId={setActiveId(CONSTS.ORIFICE_FEATURE, orifice.name)}
                />;
    };

    const getWeirGraph = weir => {
      let pts = [weir.inletNode.position].concat(weir.vertices).concat(weir.outletNode.position);
      pts = pts.map(pt => graphHelper.getPointOnCanvas(pt));
      const isActive = activeId === weir.name && activeFeature === CONSTS.WEIR_FEATURE;
      return <WeirGraph
                key={CONSTS.WEIR_GRAPH_ID_PREFIX + weir.name}
                isActive={isActive}
                points={pts}
                setActiveId={setActiveId(CONSTS.WEIR_FEATURE, weir.name)}
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
          { dividers.map(getDividerGraph) }
          { storages.map(getStorageGraph) }
          { conduits.map(getConduitGraph) }
          { pumps.map(getPumpGraph) }
          { orifices.map(getOrificeGraph) }
          { weirs.map(getWeirGraph) }
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