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
    const getClassName = (myFeature) => activeFeature === myFeature ? "is-active" : "";

    return (
      <aside id="left-pane-treeview" className="menu">
        <p className="menu-label">Hydrology</p>
        <ul className="menu-list">
          <a onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Rain Gages</a>
          <a onClick={setActiveFeature(CONSTS.SUBCATCHMENT_FEATURE)} className={getClassName(CONSTS.SUBCATCHMENT_FEATURE)}>Subcatchments</a>
        </ul>
        <p className="menu-label">Hydraulics</p>
        <ul className="menu-list">
          <li>
            <a>Nodes</a>
            <ul>
              <li><a onClick={setActiveFeature(CONSTS.JUNCTION_FEATURE)} className={getClassName(CONSTS.JUNCTION_FEATURE)}>Junctions</a></li>
              <li><a onClick={setActiveFeature(CONSTS.OUTFALL_FEATURE)} className={getClassName(CONSTS.OUTFALL_FEATURE)}>Outfalls</a></li>
              <li><a onClick={setActiveFeature(CONSTS.DIVIDER_FEATURE)} className={getClassName(CONSTS.DIVIDER_FEATURE)}>Dividers</a></li>
              <li><a onClick={setActiveFeature(CONSTS.STORAGE_FEATURE)} className={getClassName(CONSTS.STORAGE_FEATURE)}>Storages</a></li>
            </ul>
          </li>
          <li>
            <a>Links</a>
            <ul>
              <li><a onClick={setActiveFeature(CONSTS.CONDUIT_FEATURE)} className={getClassName(CONSTS.CONDUIT_FEATURE)}>Conduits</a></li>
              <li><a onClick={setActiveFeature(CONSTS.PUMP_FEATURE)} className={getClassName(CONSTS.PUMP_FEATURE)}>Pumps</a></li>
              <li><a onClick={setActiveFeature(CONSTS.ORIFICE_FEATURE)} className={getClassName(CONSTS.ORIFICE_FEATURE)}>Orifices</a></li>
              <li><a onClick={setActiveFeature(CONSTS.WEIR_FEATURE)} className={getClassName(CONSTS.WEIR_FEATURE)}>Weirs</a></li>
              <li><a onClick={setActiveFeature(CONSTS.OUTLET_FEATURE)} className={getClassName(CONSTS.OUTLET_FEATURE)}>Outlets</a></li>
            </ul>
          </li>
        </ul>
      </aside>
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