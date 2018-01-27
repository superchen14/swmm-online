import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CONSTS from "./consts";
import SwmmTreatmentsModal from "./swmm_treatments_modal";

const getEntityProperties = entity => ({"Name": entity.name});

const getNodeProperties = node => {
  var properties = getEntityProperties(node);
  properties["X"] = node.position.x;
  properties["Y"] = node.position.y;
  properties["Invert El."] = node.invertElevation;
  properties["Treatment"] = node.treatments && node.treatments.length !== 0 ? "YES" : "NO";

  return properties;
};

const getJunctionProperties = junction => {
  var properties = getNodeProperties(junction);
  properties["Max. Depth"] = junction.maxWaterDepth;
  properties["Init Depth"] = junction.initialWaterDepth;
  properties["Surcharge Depth"] = junction.surchargeWaterDepth;
  properties["Ponded Area"] = junction.pondedWaterArea;

  return properties;
};

const getLinkProperties = link => {
  var properties = getEntityProperties(link);
  properties["Inlet Node"] = link.inletNode.name;
  properties["Outlet Node"] = link.outletNode.name;

  return properties;
};

const getConduitProperties = conduit => {
  var properties = getLinkProperties(conduit);
  properties["Length"] = conduit.length;
  properties["Roughness"] = conduit.roughness;

  return properties;
};

const getPollutantProperties = pollutant => {
  var properties = getEntityProperties(pollutant);
  properties["Units"] = pollutant.unit;
  properties["Rain Concen."] = pollutant.concentrationInRainWater;
  properties["GW Concen."] = pollutant.concentrationInGroundWater;
  properties["I&I Concen."] = pollutant.concentrationInII;
  properties["DWF Concen."] = pollutant.concentrationInDWF;
  properties["Init Concen."] = pollutant.concentrationInit;
  properties["Decay Coeff."] = pollutant.decayCoefficient;
  properties["Snow Only"] = pollutant.snowOnly ? "YES" : "NO";
  properties["Co-Pollutant"] = pollutant.copollutantName === "" ? "*" : pollutant.copollutantName;
  properties["Co-Fraction"] = pollutant.copollutantFraction;

  return properties;
}

const getProperties = (activeFeature, activeItem) => {
  switch(activeFeature) {
    case CONSTS.OUTFALL_FEATURE:
    case CONSTS.DIVIDER_FEATURE:
    case CONSTS.STORAGE_FEATURE:
      return getNodeProperties(activeItem);
    case CONSTS.JUNCTION_FEATURE:
      return getJunctionProperties(activeItem);
    case CONSTS.CONDUIT_FEATURE:
      return getConduitProperties(activeItem);
    case CONSTS.PUMP_FEATURE:
    case CONSTS.ORIFICE_FEATURE:
    case CONSTS.WEIR_FEATURE:
    case CONSTS.OUTLET_FEATURE:
      return getLinkProperties(activeItem);
    case CONSTS.POLLUTANT_FEATURE: 
      return getPollutantProperties(activeItem);
    default:
      return {};
  }
};

const getPropertiesHtml = (activeFeature, activeItem, showNodeTreatment) => {
  const properties = getProperties(activeFeature, activeItem);
  let lists = [];
  for(const key in properties) {
    if (key.indexOf("OnClick") !== -1) continue;

    let listItem = null;
    switch(key) {
      case "Treatment":
        listItem = (
          <tr key={`property-item-${key}`}>
            <th className="property-col">{key}</th>
            <th className="value-col"><a onClick={showNodeTreatment}>{properties[key]}</a></th>
          </tr>
        );
        break;
      default:
        listItem = (
          <tr key={`property-item-${key}`}>
            <th className="property-col">{key}</th>
            <th className="value-col">{properties[key]}</th>
          </tr>
        );
    }
    lists.push(listItem);
  }

  return (
    <tbody>
      {lists}
    </tbody>
  );
}

const isNode = activeFeature => activeFeature === CONSTS.JUNCTION_FEATURE;
                            //  || activeFeature === CONSTS.OUTFALL_FEATURE
                            //  || activeFeature === CONSTS.DIVIDER_FEATURE
                            //  || activeFeature === CONSTS.STORAGE_FEATURE;

const isNodeWithTreatments = (activeFeature, activeItem) => {
  if (!activeItem) return false;
  if (!isNode(activeFeature)) return false;
  return activeItem.treatments.length !== 0;
};

class SwmmRightPanePropertyList extends React.Component{
  constructor(props) {
    super(props);
    this.showNodeTreatmentsModal = this.showNodeTreatmentsModal.bind(this);
    this.hideNodeTreatmentsModal = this.hideNodeTreatmentsModal.bind(this);
    this.state = {isTreatmentsModalActive: false};
  }

  showNodeTreatmentsModal() {
    this.setState({isTreatmentsModalActive: true});
  }

  hideNodeTreatmentsModal() {
    this.setState({isTreatmentsModalActive: false});
  }

  render() {
    const {activeItem, activeFeature} = this.props;
    return (
      <div>
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <thead>
            <tr><th className="property-col">Property</th><th className="value-col">Value</th></tr>
          </thead>
          {activeItem !== null && getPropertiesHtml(activeFeature, activeItem, this.showNodeTreatmentsModal)}
        </table>
        { isNodeWithTreatments(activeFeature, activeItem) &&
          <SwmmTreatmentsModal
            isActive={this.state.isTreatmentsModalActive}
            title="Treatments"
            onClose={this.hideNodeTreatmentsModal}
            treatments={activeItem.treatments}/>
        }
      </div>
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
    case CONSTS.POLLUTANT_FEATURE:
      return project.pollutants.find(p => p.name === activeId);
    case CONSTS.CONDUIT_FEATURE:
      return project.conduits.find(c => c.name === activeId);
    case CONSTS.PUMP_FEATURE:
      return project.pumps.find(p => p.name === activeId);
    case CONSTS.ORIFICE_FEATURE:
      return project.orifices.find(o => o.name === activeId);
    case CONSTS.WEIR_FEATURE:
      return project.weirs.find(w => w.name === activeId);
    case CONSTS.OUTLET_FEATURE:
      return project.outlets.find(o => o.name === activeId);
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