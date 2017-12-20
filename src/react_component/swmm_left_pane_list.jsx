import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CONSTS from "./consts";
import { setActiveIdAction } from "./actions";

class SwmmLeftPaneList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {items, idPrefix, activeFeature, activeId, setActiveId} = this.props;
    return (
      <div id="left-pane-list">
        {items.map(item => {
          let className = "list-item";
          if (item.name === activeId) { className = className + " selected"; }
          return (
            <div key={idPrefix + item.name} className={className} onClick={setActiveId(activeFeature, item.name)}>
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
}

SwmmLeftPaneList.propTypes = {
  items: PropTypes.array.isRequired,
  idPrefix: PropTypes.string.isRequired,
  activeFeature: PropTypes.string.isRequired,
  activeId: PropTypes.string.isRequired,
  setActiveId: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  if (state && state.ui && state.project && state.ui.activeFeature !== CONSTS.NONE_FEATURE) {
    const activeId = state.ui.activeId;
    const activeFeature = state.ui.activeFeature;
    switch(activeFeature) {
      case CONSTS.JUNCTION_FEATURE:
        return {
          items: state.project.junctions,
          idPrefix: CONSTS.JUNCTION_ID_PREFIX,
          activeFeature,
          activeId,
        };
      case CONSTS.OUTFALL_FEATURE:
        return {
          items: state.project.outfalls,
          idPrefix: CONSTS.OUTFALL_ID_PREFIX,
          activeFeature,
          activeId,
        };
      case CONSTS.DIVIDER_FEATURE:
        return {
          items: state.project.dividers,
          idPrefix: CONSTS.DIVIDER_ID_PREFIX,
          activeFeature,
          activeId,
        };
      case CONSTS.STORAGE_FEATURE:
        return {
          items: state.project.storages,
          idPrefix: CONSTS.STORAGE_ID_PREFIX,
          activeFeature,
          activeId
        };
      case CONSTS.CONDUIT_FEATURE:
        return {
          items: state.project.conduits,
          idPrefix: CONSTS.CONDUIT_ID_PREFIX,
          activeFeature,
          activeId,
        };
      case CONSTS.PUMP_FEATURE:
        return {
          items: state.project.pumps,
          idPrefix: CONSTS.PUMP_ID_PREFIX,
          activeFeature,
          activeId,
        };
      case CONSTS.ORIFICE_FEATURE:
        return {
          items: state.project.orifices,
          idPrefix: CONSTS.ORIFICE_ID_PREFIX,
          activeFeature,
          activeId,
        };
      case CONSTS.WEIR_FEATURE:
        return {
          items: state.project.weirs,
          idPrefix: CONSTS.WEIR_ID_PREFIX,
          activeFeature,
          activeId
        }
      case CONSTS.OUTLET_FEATURE:
        return {
          items: state.project.outlets,
          idPrefix: CONSTS.OUTLET_ID_PREFIX,
          activeFeature,
          activeId
        };
      case CONSTS.SUBCATCHMENT_FEATURE:
        return {
          items: state.project.subcatchments,
          idPrefix: CONSTS.SUBCATCHMENT_ID_PREFIX,
          activeFeature,
          activeId,
        };
    }
  }

  return {items: [], idPrefix: "", activeId: "", activeFeature: CONSTS.NONE_FEATURE};
};

const mapDispatchToProps = (dispatch) => ({
  setActiveId: (activeFeature, activeId) => () => dispatch(setActiveIdAction(activeFeature, activeId))
});
const ConnectedSwmmLeftPaneList = connect(mapStateToProps, mapDispatchToProps)(SwmmLeftPaneList);

export default ConnectedSwmmLeftPaneList;