import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CONSTS from "./consts";

const getJunctionProperties = junction => {
  return (
    <tbody>
      <tr><th>Name</th><th>{junction.name}</th></tr>
      <tr><th>X</th><th>{junction.position.x}</th></tr>
      <tr><th>Y</th><th>{junction.position.y}</th></tr>
    </tbody>
  );
}

class SwmmRightPanePropertyList extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {activeItem, activeFeature} = this.props;
    return (
      <table className="table is-hoverable is-bordered">
        <thead>
          <tr><th>Property</th><th>Value</th></tr>
        </thead>
        {activeItem !== null && activeFeature === CONSTS.JUNCTION_FEATURE && getJunctionProperties(activeItem)}
      </table>
    );
  }
}

SwmmRightPanePropertyList.propTypes = {
  activeItem: PropTypes.object.isRequired,
  activeFeature: PropTypes.string.isRequired,
}

const getActiveItem = state => {
  if (state && state.ui && state.ui.activeFeature && state.ui.activeId && state.project) {
    const project = state.project;
    const activeId = state.ui.activeId;
    const activeFeature = state.ui.activeFeature;
    if (activeFeature !== CONSTS.NONE_FEATURE &&activeId !== "") {
      switch(activeFeature) {
      case CONSTS.JUNCTION_FEATURE:
        const junction = project.junctions.find(j => j.name === activeId);
        return junction;
      }
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