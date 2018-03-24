import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmTimePatternModal = props => {
  const {timePattern} = props;

  const getHourlyMultipliers = timePattern => {
    const dailyMultipliers = (<tbody>
      <tr><th className="normal-col">12 AM</th><th className="normal-col">{timePattern.multipliers[0]}</th></tr>
      <tr><th className="normal-col">1 AM</th><th className="normal-col">{timePattern.multipliers[1]}</th></tr>
      <tr><th className="normal-col">2 AM</th><th className="normal-col">{timePattern.multipliers[2]}</th></tr>
      <tr><th className="normal-col">3 AM</th><th className="normal-col">{timePattern.multipliers[3]}</th></tr>
      <tr><th className="normal-col">4 AM</th><th className="normal-col">{timePattern.multipliers[4]}</th></tr>
      <tr><th className="normal-col">5 AM</th><th className="normal-col">{timePattern.multipliers[5]}</th></tr>
      <tr><th className="normal-col">6 AM</th><th className="normal-col">{timePattern.multipliers[6]}</th></tr>
      <tr><th className="normal-col">7 AM</th><th className="normal-col">{timePattern.multipliers[7]}</th></tr>
      <tr><th className="normal-col">8 AM</th><th className="normal-col">{timePattern.multipliers[8]}</th></tr>
      <tr><th className="normal-col">9 AM</th><th className="normal-col">{timePattern.multipliers[9]}</th></tr>
      <tr><th className="normal-col">10 AM</th><th className="normal-col">{timePattern.multipliers[10]}</th></tr>
      <tr><th className="normal-col">11 AM</th><th className="normal-col">{timePattern.multipliers[11]}</th></tr>
      <tr><th className="normal-col">12 PM</th><th className="normal-col">{timePattern.multipliers[12]}</th></tr>
      <tr><th className="normal-col">1 PM</th><th className="normal-col">{timePattern.multipliers[13]}</th></tr>
      <tr><th className="normal-col">2 PM</th><th className="normal-col">{timePattern.multipliers[14]}</th></tr>
      <tr><th className="normal-col">3 PM</th><th className="normal-col">{timePattern.multipliers[15]}</th></tr>
      <tr><th className="normal-col">4 PM</th><th className="normal-col">{timePattern.multipliers[16]}</th></tr>
      <tr><th className="normal-col">5 PM</th><th className="normal-col">{timePattern.multipliers[17]}</th></tr>
      <tr><th className="normal-col">6 PM</th><th className="normal-col">{timePattern.multipliers[18]}</th></tr>
      <tr><th className="normal-col">7 PM</th><th className="normal-col">{timePattern.multipliers[19]}</th></tr>
      <tr><th className="normal-col">8 PM</th><th className="normal-col">{timePattern.multipliers[20]}</th></tr>
      <tr><th className="normal-col">9 PM</th><th className="normal-col">{timePattern.multipliers[21]}</th></tr>
      <tr><th className="normal-col">10 PM</th><th className="normal-col">{timePattern.multipliers[22]}</th></tr>
      <tr><th className="normal-col">11 PM</th><th className="normal-col">{timePattern.multipliers[23]}</th></tr>
    </tbody>);
    return dailyMultipliers;
  };

  const getDailyMultipliers = timePattern => {
    const hourlyMultipliers = (<tbody>
      <tr><th className="normal-col">Sun</th><th className="normal-col">{timePattern.multipliers[0]}</th></tr>
      <tr><th className="normal-col">Mon</th><th className="normal-col">{timePattern.multipliers[1]}</th></tr>
      <tr><th className="normal-col">TUE</th><th className="normal-col">{timePattern.multipliers[2]}</th></tr>
      <tr><th className="normal-col">WED</th><th className="normal-col">{timePattern.multipliers[3]}</th></tr>
      <tr><th className="normal-col">THU</th><th className="normal-col">{timePattern.multipliers[4]}</th></tr>
      <tr><th className="normal-col">FRI</th><th className="normal-col">{timePattern.multipliers[5]}</th></tr>
      <tr><th className="normal-col">SAT</th><th className="normal-col">{timePattern.multipliers[6]}</th></tr>
    </tbody>);
    return hourlyMultipliers;
  }

  const getMonthlyMultipliers = timePattern => {
    const monthlyMultipliers = (<tbody>
      <tr><th className="normal-col">Jan</th><th className="normal-col">{timePattern.multipliers[0]}</th></tr>
      <tr><th className="normal-col">Feb</th><th className="normal-col">{timePattern.multipliers[1]}</th></tr>
      <tr><th className="normal-col">Mar</th><th className="normal-col">{timePattern.multipliers[2]}</th></tr>
      <tr><th className="normal-col">Apr</th><th className="normal-col">{timePattern.multipliers[3]}</th></tr>
      <tr><th className="normal-col">May</th><th className="normal-col">{timePattern.multipliers[4]}</th></tr>
      <tr><th className="normal-col">Jun</th><th className="normal-col">{timePattern.multipliers[5]}</th></tr>
      <tr><th className="normal-col">Jul</th><th className="normal-col">{timePattern.multipliers[6]}</th></tr>
      <tr><th className="normal-col">Aug</th><th className="normal-col">{timePattern.multipliers[7]}</th></tr>
      <tr><th className="normal-col">Sep</th><th className="normal-col">{timePattern.multipliers[8]}</th></tr>
      <tr><th className="normal-col">Oct</th><th className="normal-col">{timePattern.multipliers[9]}</th></tr>
      <tr><th className="normal-col">Nov</th><th className="normal-col">{timePattern.multipliers[10]}</th></tr>
      <tr><th className="normal-col">Dec</th><th className="normal-col">{timePattern.multipliers[11]}</th></tr>
    </tbody>);
    return monthlyMultipliers;
 }

  return (
    <SwmmModal {...props} title="Time Pattern" width={300}>
      {
        timePattern && 
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <tbody>
            <tr>
              <th className="normal-col">Name</th>
              <th className="normal-col">{timePattern.name}</th>
            </tr>
            <tr>
              <th className="normal-col">Type</th>
              <th className="normal-col">{timePattern.patternType}</th>
            </tr>
            <tr>
              <th className="normal-col">Multipliers</th>
              <th className="normal-col"></th>
            </tr>
          </tbody>
          { timePattern.patternType === "DAILY" && getDailyMultipliers(timePattern) }
          { (timePattern.patternType === "HOURLY" || timePattern.patternType === "WEEKEND") && getHourlyMultipliers(timePattern) }
          { timePattern.patternType === "MONTHLY" && getMonthlyMultipliers(timePattern) }
        </table>
      }
    </SwmmModal>
  );
};

SwmmTimePatternModal.propTypes = {
  timePattern: PropTypes.object
}

export default SwmmTimePatternModal;