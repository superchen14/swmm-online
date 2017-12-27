import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CONSTS from "./consts";

const getNodeProperties = node => {
  return (
    <tbody>
      <tr><th>Name</th><th>{node.name}</th></tr>
      <tr><th>X</th><th>{node.position.x}</th></tr>
      <tr><th>Y</th><th>{node.position.y}</th></tr>
      <tr><th>Invert El.</th><th>{node.invertElevation}</th></tr>
    </tbody>
  );
}

const getProperties = (activeFeature, activeItem) => {
  switch(activeFeature) {
    case CONSTS.JUNCTION_FEATURE:
    case CONSTS.OUTFALL_FEATURE:
    case CONSTS.DIVIDER_FEATURE:
    case CONSTS.STORAGE_FEATURE:
      return getNodeProperties(activeItem);
    default:
      return null;
  }
}

class SwmmRightPanePropertyList extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {activeItem, activeFeature} = this.props;
    return (
      <table className="table is-hoverable is-bordered" id="swmm-property-list">
        <thead>
          <tr><th>Property</th><th>Value</th></tr>
        </thead>
        {activeItem !== null && getProperties(activeFeature, activeItem)}
      </table>
    );
  }
}

SwmmRightPanePropertyList.propTypes = {
  activeItem: PropTypes.object,
  activeFeature: PropTypes.string.isRequired,
}

const getActiveItem = state => {
  const project = state.project;
  const activeId = state.ui.activeId;
  const activeFeature = state.ui.activeFeature;
  if (activeFeature !== CONSTS.NONE_FEATURE &&activeId !== CONSTS.EMPTY_STRING) {
    switch(activeFeature) {
    case CONSTS.JUNCTION_FEATURE:
      return project.junctions.find(j => j.name === activeId);
    case CONSTS.OUTFALL_FEATURE:
      return project.outfalls.find(o => o.name === activeId);
    case CONSTS.DIVIDER_FEATURE:
      return project.dividers.find(d => d.name === activeId);
    case CONSTS.STORAGE_FEATURE:
      return project.storages.find(s => s.name === activeId);
    }
  }

  return null;
};

const mapStateToProps = state => ({
  activeFeature: (state && state.ui) ? state.ui.activeFeature : CONSTS.NONE_FEATURE,
  activeItem: getActiveItem(state),
});

const mapDispatchToProps = () => ({});

const ConnectedSwmmRightPanePropertyList = connect(mapStateToProps, mapDispatchToProps)(SwmmRightPanePropertyList);

export default ConnectedSwmmRightPanePropertyList;