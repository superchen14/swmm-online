import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const GENERAL_TAB = 0;
const BUILDUP_TAB = 1;
const WASSOFF_TAB = 2;
class SwmmLandUseModal extends React.Component {
  constructor(props) {
    super(props);
    const {landUse} = this.props;
    this.state = {activeTab: GENERAL_TAB, activeBuildupPollutant: landUse && landUse.buildups[0] ? landUse.buildups[0].pollutantName : ""};
  }

  render() {
    const {landUse} = this.props;
    let {activeTab, activeBuildupPollutant} = this.state;
    !activeBuildupPollutant && landUse && landUse.buildups[0] && (activeBuildupPollutant = landUse.buildups[0].pollutantName);
    const activeBuildup = landUse ? landUse.buildups.find(buildup => buildup.pollutantName === activeBuildupPollutant) : null;
    const setActiveTab = activeTab => () => this.setState({activeTab});
    return (
      <SwmmModal {...this.props} title="Land Use" width={350} height={500}>
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className={activeTab === GENERAL_TAB ? "is-active" : ""} onClick={setActiveTab(GENERAL_TAB)}><a><span>General</span></a></li>
            <li className={activeTab === BUILDUP_TAB ? "is-active" : ""} onClick={setActiveTab(BUILDUP_TAB)}><a><span>Buildup</span></a></li>
            <li className={activeTab === WASSOFF_TAB ? "is-active" : ""} onClick={setActiveTab(WASSOFF_TAB)}><a><span>Washoff</span></a></li>
          </ul>
        </div>
        {
          landUse && activeTab === GENERAL_TAB &&
          <table className="table is-hoverable is-bordered" id="swmm-property-list">
            <thead>
              <tr><th>Property</th><th>Value</th></tr>
            </thead>
            <tbody>
              <tr><th className="normal-col">Name</th><th className="normal-col">{landUse.name}</th></tr>
            </tbody>
            <thead>
              <tr><th>STREET SWEEPING</th><th></th></tr>
            </thead>
            <tbody>
              <tr><th className="normal-col">Interval</th><th className="normal-col">{landUse.interval}</th></tr>
              <tr><th className="normal-col">Availability</th><th className="normal-col">{landUse.availability}</th></tr>
              <tr><th className="normal-col">Last Swept</th><th className="normal-col">{landUse.lastSwept}</th></tr>
            </tbody>
          </table>
        }
        {
          landUse && activeTab === BUILDUP_TAB &&
          <table className="table is-hoverable is-bordered" id="swmm-property-list">
            <thead>
              <tr><th>Property</th><th>Value</th></tr>
            </thead>
            <tbody>
              <tr><th className="normal-col">Pollutant</th><th className="normal-col">{activeBuildupPollutant}</th></tr>
              <tr><th className="normal-col">Function</th><th className="normal-col">{activeBuildup && activeBuildup.function}</th></tr>
              <tr><th className="normal-col">Max. Buildup</th><th className="normal-col">{activeBuildup && activeBuildup.coeff1}</th></tr>
              <tr><th className="normal-col">Rate Constant</th><th className="normal-col">{activeBuildup && activeBuildup.coeff2}</th></tr>
              <tr><th className="normal-col">Power/Sat. Constant</th><th className="normal-col">{activeBuildup && activeBuildup.coeff3}</th></tr>
              <tr><th className="normal-col">Normalizer</th><th className="normal-col">{activeBuildup && activeBuildup.perUnit}</th></tr>
            </tbody>
          </table>
        }
      </SwmmModal>
    );
  }
};

SwmmLandUseModal.propTypes = {
  landUse: PropTypes.object
}

export default SwmmLandUseModal;