import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import { setActiveFeatureAction } from "./actions";
import CONSTS from "./consts";

class SwmmLeftPaneTreeView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeFeature, setActiveFeature } = this.props;
    const junctionSpanClassName = activeFeature === CONSTS.JUNCTION_FEATURE ? "selected" : "";
    const outfallSpanClassName = activeFeature === CONSTS.OUTFALL_FEATURE ? "selected" : "";
    const dividerSpanClassName = activeFeature === CONSTS.DIVIDER_FEATURE ? "selected" : "";
    const storageSpanClassName = activeFeature === CONSTS.STORAGE_FEATURE ? "selected" : "";
    const conduitSpanClassName = activeFeature === CONSTS.CONDUIT_FEATURE ? "selected" : "";
    const pumpSpanClassName = activeFeature === CONSTS.PUMP_FEATURE ? "selected" : "";
    const orificeSpanClassName = activeFeature === CONSTS.ORIFICE_FEATURE ? "selected" : "";
    const weirSpanClassName = activeFeature === CONSTS.WEIR_FEATURE ? "selected" : "";
    const outletSpanClassName = activeFeature === CONSTS.OUTLET_FEATURE ? "selected" : "";
    const subcatchmentSpanClassName = activeFeature === CONSTS.SUBCATCHMENT_FEATURE ? "selected" : "";

    return (
      <div id="left-pane-treeview">
        <details open className="treeview-root-node">
          <summary>Hydrology</summary>
          <div className="treeview-leaf-node"><span onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Rain Gages</span></div>
          <div className="treeview-leaf-node">
            <span onClick={setActiveFeature(CONSTS.SUBCATCHMENT_FEATURE)} className={subcatchmentSpanClassName}>Subcatchments</span>
          </div>
        </details>
        <details open className="treeview-root-node">
          <summary>Hydraulics</summary>
          <details className="treeview-node">
            <summary>Nodes</summary>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.JUNCTION_FEATURE)} className={junctionSpanClassName}>Junctions</span>
            </div>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.OUTFALL_FEATURE)} className={outfallSpanClassName}>Outfalls</span>
            </div>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.DIVIDER_FEATURE)} className={dividerSpanClassName}>Dividers</span>
            </div>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.STORAGE_FEATURE)} className={storageSpanClassName}>Storage Units</span>
            </div>
          </details>
          <details className="treeview-node">
            <summary>Links</summary>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.CONDUIT_FEATURE)} className={conduitSpanClassName}>Conduits</span>
            </div>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.PUMP_FEATURE)} className={pumpSpanClassName}>Pumps</span>
            </div>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.ORIFICE_FEATURE)} className={orificeSpanClassName}>Orifices</span>
            </div>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.WEIR_FEATURE)} className={weirSpanClassName}>Weirs</span>
            </div>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.OUTLET_FEATURE)} className={outletSpanClassName}>Outlets</span></div>
          </details>
        </details>
      </div>
    );
  }
}

SwmmLeftPaneTreeView.propTypes = {
  activeFeature: PropTypes.string.isRequired,
  setActiveFeature: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({activeFeature: state && state.ui ? state.ui.activeFeature : CONSTS.NONE_FEATURE});
const mapDispatchToProps = dispatch => ({ setActiveFeature: activeFeature => () => dispatch(setActiveFeatureAction(activeFeature)) });
const ConnectedSwmmLeftPaneTreeView = connect(mapStateToProps, mapDispatchToProps)(SwmmLeftPaneTreeView);

export default ConnectedSwmmLeftPaneTreeView;