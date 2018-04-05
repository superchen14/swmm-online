import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const GENERAL_TAB = 0;
const BUILDUP_TAB = 1;
const WASSOFF_TAB = 2;
class SwmmLandUseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: GENERAL_TAB};
  }

  render() {
    const {landUse} = this.props;
    const {activeTab} = this.state;
    const setActiveTab = activeTab => () => this.setState({activeTab});
    return (
      <SwmmModal {...this.props} title="Land Use" width={350} height={460}>
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
      </SwmmModal>
    );
  }
};

SwmmLandUseModal.propTypes = {
  landUse: PropTypes.object
}

export default SwmmLandUseModal;