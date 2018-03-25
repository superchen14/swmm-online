import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CONSTS from "./consts";
import { setActiveItemAction } from "./actions";
import SwmmTimePatternModal from "./swmm_time_pattern_modal";

class SwmmLeftPaneList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const selectedItem = this.dom.getElementsByClassName("is-active")[0];
    if (selectedItem) {
      const listRect = this.dom.getBoundingClientRect();
      const itemRect = selectedItem.getBoundingClientRect();
      if (!(itemRect.top > listRect.top && itemRect.bottom < listRect.bottom)) {
        selectedItem.scrollIntoView(true);
      }
    }
  }

  render() {
    const {items, idPrefix, activeFeature, activeId, activeItem, setActiveId, listFilter} = this.props;
    return (
      <div id="left-pane-list" ref={dom => {this.dom = dom;}}>
        <nav className="panel">
        { items.filter(i => listFilter === null || i.name.indexOf(listFilter) != -1).map(item => {
          let className = "panel-block";
          const isSelected = item.name === activeId;
          if (isSelected) { className = className + " is-active"; }
          return (
            <a key={idPrefix + item.name} className={className} onClick={setActiveId(activeFeature, item.name)}>
              <div style={{width: "90%"}}>{item.name}</div>
            </a>
          );
        })}
        </nav>
        <SwmmTimePatternModal isActive={activeFeature === CONSTS.TIMEPATTERN_FEATURE && activeId !== ""} onClose={setActiveId(activeFeature, activeId)} timePattern={activeItem}/>
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
  setActiveId: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  let items = [];
  let idPrefix = "";
  const activeId = state.ui.activeId;
  const activeFeature = state.ui.activeFeature;
  const listFilter = state.ui.listFilter;
  let activeItem = null;

  if (state.project && state.ui.activeFeature !== CONSTS.NONE_FEATURE) {
    switch(activeFeature) {
      case CONSTS.JUNCTION_FEATURE:
        items = state.project.junctions;
        idPrefix = CONSTS.JUNCTION_ID_PREFIX;
        break;
      case CONSTS.OUTFALL_FEATURE:
        items = state.project.outfalls;
        idPrefix = CONSTS.OUTFALL_ID_PREFIX;
        break;
      case CONSTS.DIVIDER_FEATURE:
        items = state.project.dividers;
        idPrefix = CONSTS.DIVIDER_ID_PREFIX;
        break;
      case CONSTS.STORAGE_FEATURE:
        items = state.project.storages;
        idPrefix = CONSTS.STORAGE_ID_PREFIX;
        break;
      case CONSTS.CONDUIT_FEATURE:
        items = state.project.conduits;
        idPrefix = CONSTS.CONDUIT_ID_PREFIX;
        break;
      case CONSTS.PUMP_FEATURE:
        items = state.project.pumps;
        idPrefix = CONSTS.PUMP_ID_PREFIX;
        break;
      case CONSTS.ORIFICE_FEATURE:
        items = state.project.orifices;
        idPrefix = CONSTS.ORIFICE_ID_PREFIX;
        break;
      case CONSTS.WEIR_FEATURE:
        items = state.project.weirs;
        idPrefix = CONSTS.WEIR_ID_PREFIX;
        break;
      case CONSTS.OUTLET_FEATURE:
        items = state.project.outlets;
        idPrefix = CONSTS.OUTLET_ID_PREFIX;
        break;
      case CONSTS.SUBCATCHMENT_FEATURE:
        items = state.project.subcatchments;
        idPrefix = CONSTS.SUBCATCHMENT_ID_PREFIX;
        break;
      case CONSTS.POLLUTANT_FEATURE:
        items = state.project.pollutants;
        idPrefix = CONSTS.POLLUTANT_ID_PREFIX;
        break;
      case CONSTS.TIMEPATTERN_FEATURE:
        items = state.project.timePatterns;
        idPrefix = CONSTS.TIMEPATTERN_ID_PREFIX;
        break;
      case CONSTS.LANDUSE_FEATURE:
        items = state.project.landUses;
        idPrefix = CONSTS.LANDUSE_ID_PREFIX;
        break;
    }
    if (activeId !== "") { activeItem = items.find(item => item.name === activeId); }
  }

  return {items, idPrefix, activeId, activeItem, activeFeature, listFilter};
};

SwmmLeftPaneList.propTypes = {
  activeItem: PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  setActiveId: (activeFeature, activeId) => () => dispatch(setActiveItemAction(activeFeature, activeId)),
});
const ConnectedSwmmLeftPaneList = connect(mapStateToProps, mapDispatchToProps)(SwmmLeftPaneList);

export default ConnectedSwmmLeftPaneList;