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
    const conduitSpanClassName = activeFeature === CONSTS.CONDUIT_FEATURE ? "selected" : "";
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
            <div className="treeview-leaf-node"><span onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Dividers</span></div>
            <div className="treeview-leaf-node"><span onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Storage Units</span></div>
          </details>
          <details className="treeview-node">
            <summary>Links</summary>
            <div className="treeview-leaf-node">
              <span onClick={setActiveFeature(CONSTS.CONDUIT_FEATURE)} className={conduitSpanClassName}>Conduits</span>
            </div>
            <div className="treeview-leaf-node"><span onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Pumps</span></div>
            <div className="treeview-leaf-node"><span onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Orifices</span></div>
            <div className="treeview-leaf-node"><span onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Weirs</span></div>
            <div className="treeview-leaf-node"><span onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Outlets</span></div>
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