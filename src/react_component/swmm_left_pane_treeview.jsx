import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import { setActiveFeatureAction } from "./actions";
import CONSTS from "./consts";

class SwmmLeftPaneTreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNodesTreeNodeExpanded: false,
      isLinksTreeNodeExpanded: false,
      isHydraulicsTreeNodeExpanded: true,
      isHydrologyTreeNodeExpanded: true,
    };

    this.toggleNodesTreeNode = this.toggleNodesTreeNode.bind(this);
    this.toggleLinksTreeNode = this.toggleLinksTreeNode.bind(this);
    this.toggleHydraulicsTreeNode = this.toggleHydraulicsTreeNode.bind(this);
    this.toggleHydrologyTreeNode = this.toggleHydrologyTreeNode.bind(this);
  }

  toggleNodesTreeNode() {
    this.setState({isNodesTreeNodeExpanded: !this.state.isNodesTreeNodeExpanded });
  }

  toggleLinksTreeNode() {
    this.setState({isLinksTreeNodeExpanded: !this.state.isLinksTreeNodeExpanded});
  }

  toggleHydraulicsTreeNode() {
    this.setState({isHydraulicsTreeNodeExpanded: !this.state.isHydraulicsTreeNodeExpanded});
  }

  toggleHydrologyTreeNode() {
    this.setState({isHydrologyTreeNodeExpanded: !this.state.isHydrologyTreeNodeExpanded});
  }

  render() {
    const { activeFeature, setActiveFeature } = this.props;
    const { isNodesTreeNodeExpanded, isLinksTreeNodeExpanded, isHydraulicsTreeNodeExpanded, isHydrologyTreeNodeExpanded } = this.state;
    const getClassName = (myFeature) => activeFeature === myFeature ? "is-active" : "";

    const treeNodeWithArrow = (text, isExpanded, onClick) => {
      const arrowClass = isExpanded ? "fa fa-angle-down fa-lg" : "fa fa-angle-right fa-lg";
      const expandClass = isExpanded ? "expanded" : "unexpanded";
      return (
        <a className={expandClass} onClick={onClick}>
          <i className={arrowClass} aria-hidden="true"></i>
          <span>{text}</span>
        </a>
      );
    };

    const nodesTreeNode = (
      <li>
        { treeNodeWithArrow("Nodes", isNodesTreeNodeExpanded, this.toggleNodesTreeNode) }
        {
          isNodesTreeNodeExpanded && (
            <ul>
              <li><a onClick={setActiveFeature(CONSTS.JUNCTION_FEATURE)} className={getClassName(CONSTS.JUNCTION_FEATURE)}>Junctions</a></li>
              <li><a onClick={setActiveFeature(CONSTS.OUTFALL_FEATURE)} className={getClassName(CONSTS.OUTFALL_FEATURE)}>Outfalls</a></li>
              <li><a onClick={setActiveFeature(CONSTS.DIVIDER_FEATURE)} className={getClassName(CONSTS.DIVIDER_FEATURE)}>Dividers</a></li>
              <li><a onClick={setActiveFeature(CONSTS.STORAGE_FEATURE)} className={getClassName(CONSTS.STORAGE_FEATURE)}>Storages</a></li>
            </ul>
          )
        }
      </li>
    );

    const linksTreeNode = (
      <li>
        { treeNodeWithArrow("Links", isLinksTreeNodeExpanded, this.toggleLinksTreeNode) }
        {
          isLinksTreeNodeExpanded && (
            <ul>
              <li><a onClick={setActiveFeature(CONSTS.CONDUIT_FEATURE)} className={getClassName(CONSTS.CONDUIT_FEATURE)}>Conduits</a></li>
              <li><a onClick={setActiveFeature(CONSTS.PUMP_FEATURE)} className={getClassName(CONSTS.PUMP_FEATURE)}>Pumps</a></li>
              <li><a onClick={setActiveFeature(CONSTS.ORIFICE_FEATURE)} className={getClassName(CONSTS.ORIFICE_FEATURE)}>Orifices</a></li>
              <li><a onClick={setActiveFeature(CONSTS.WEIR_FEATURE)} className={getClassName(CONSTS.WEIR_FEATURE)}>Weirs</a></li>
              <li><a onClick={setActiveFeature(CONSTS.OUTLET_FEATURE)} className={getClassName(CONSTS.OUTLET_FEATURE)}>Outlets</a></li>
            </ul>
          )
        }
      </li>
    );

    const hydraulicsTreeNode = (
      <ul className="menu-list">
        <li>
          { treeNodeWithArrow("Hydraulics", isHydraulicsTreeNodeExpanded, this.toggleHydraulicsTreeNode) }
          { isHydraulicsTreeNodeExpanded && (
              <ul>
                { nodesTreeNode }
                { linksTreeNode }
              </ul>
            ) 
          }
        </li>
      </ul>
    );

    const hydrologyTreeNode = (
      <ul className="menu-list">
        <li>
          { treeNodeWithArrow("Hydrology", isHydrologyTreeNodeExpanded, this.toggleHydrologyTreeNode) }
          { isHydrologyTreeNodeExpanded && (
              <ul>
                <a onClick={setActiveFeature(CONSTS.NONE_FEATURE)}>Rain Gages</a>
                <a onClick={setActiveFeature(CONSTS.SUBCATCHMENT_FEATURE)} className={getClassName(CONSTS.SUBCATCHMENT_FEATURE)}>Subcatchments</a>
              </ul>
            )
          }
        </li>
      </ul>
    );

    return (
      <aside id="left-pane-treeview" className="menu">
        { hydrologyTreeNode }
        { hydraulicsTreeNode }
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