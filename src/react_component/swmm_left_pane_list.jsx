import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CONSTS from "./consts";
import { setActiveItemAction, editActiveItemAction } from "./actions";

class SwmmLeftPaneList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {items, idPrefix, activeFeature, activeId, setActiveId, editActiveId, shouldShowEditIcon, listFilter} = this.props;
    const onEdit = (activeFeature, activeId) => e => {
      editActiveId(activeFeature, activeId);
      e.stopPropagation();
    }
    return (
      <div id="left-pane-list">
        <nav className="panel">
        { items.filter(i => listFilter === null || i.name.indexOf(listFilter) != -1).map(item => {
          let className = "panel-block";
          const isSelected = item.name === activeId;
          if (isSelected) { className = className + " is-active"; }
          return (
            <a key={idPrefix + item.name} className={className} onClick={setActiveId(activeFeature, item.name)}>
              <div style={{width: "90%"}}>{item.name}</div>
              {shouldShowEditIcon && isSelected && <i className="panel-icon fa fa-edit edit-item" onClick={onEdit(activeFeature, item.name)}/>}
            </a>
          );
        })}
        </nav>
      </div>
    );
  }
}

SwmmLeftPaneList.propTypes = {
  listFilter: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  idPrefix: PropTypes.string.isRequired,
  activeFeature: PropTypes.string.isRequired,
  activeId: PropTypes.string.isRequired,
  shouldShowEditIcon: PropTypes.bool.isRequired,
  setActiveId: PropTypes.func.isRequired,
  editActiveId: PropTypes.func.isRequired,
};

const isRightPaneVisible = state => {
  const isRightPaneEnabled = (state && state.ui && state.ui.isRightPaneEnabled) || false;
  const isRightPanePinned = (state && state.ui && state.ui.isRightPanePinned) || false;
  return isRightPaneEnabled || isRightPanePinned;
};

const mapStateToProps = state => {
  let listFilter = "";
  if (state && state.ui && state.ui.listFilter) {
    listFilter = state.ui.listFilter;
  }

  if (state && state.ui && state.project && state.ui.activeFeature !== CONSTS.NONE_FEATURE) {
    const shouldShowEditIcon = !isRightPaneVisible(state);

    const activeId = state.ui.activeId;
    const activeFeature = state.ui.activeFeature;
    switch(activeFeature) {
      case CONSTS.JUNCTION_FEATURE:
        return {
          items: state.project.junctions,
          idPrefix: CONSTS.JUNCTION_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.OUTFALL_FEATURE:
        return {
          items: state.project.outfalls,
          idPrefix: CONSTS.OUTFALL_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.DIVIDER_FEATURE:
        return {
          items: state.project.dividers,
          idPrefix: CONSTS.DIVIDER_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.STORAGE_FEATURE:
        return {
          items: state.project.storages,
          idPrefix: CONSTS.STORAGE_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.CONDUIT_FEATURE:
        return {
          items: state.project.conduits,
          idPrefix: CONSTS.CONDUIT_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.PUMP_FEATURE:
        return {
          items: state.project.pumps,
          idPrefix: CONSTS.PUMP_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.ORIFICE_FEATURE:
        return {
          items: state.project.orifices,
          idPrefix: CONSTS.ORIFICE_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.WEIR_FEATURE:
        return {
          items: state.project.weirs,
          idPrefix: CONSTS.WEIR_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        }
      case CONSTS.OUTLET_FEATURE:
        return {
          items: state.project.outlets,
          idPrefix: CONSTS.OUTLET_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
      case CONSTS.SUBCATCHMENT_FEATURE:
        return {
          items: state.project.subcatchments,
          idPrefix: CONSTS.SUBCATCHMENT_ID_PREFIX,
          activeFeature,
          activeId,
          shouldShowEditIcon,
          listFilter,
        };
    }
  }

  return {items: [], idPrefix: "", activeId: CONSTS.EMPTY_STRING, activeFeature: CONSTS.NONE_FEATURE, shouldShowEditIcon: true, listFilter};
};

const mapDispatchToProps = (dispatch) => ({
  setActiveId: (activeFeature, activeId) => () => dispatch(setActiveItemAction(activeFeature, activeId)),
  editActiveId: (activeFeature, activeId) => dispatch(editActiveItemAction(activeFeature, activeId)),
});
const ConnectedSwmmLeftPaneList = connect(mapStateToProps, mapDispatchToProps)(SwmmLeftPaneList);

export default ConnectedSwmmLeftPaneList;