import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ConnectedSwmmCanvas from "./swmm_canvas.jsx";
import ConnectedSwmmLeftPaneMenu from "./swmm_left_pane_menu.jsx";
import ConnectedSwmmLeftPaneTreeView from "./swmm_left_pane_treeview.jsx";
import ConnectedSwmmLeftPaneList from "./swmm_left_pane_list.jsx";
import ConnectedSwmmRightPane from "./swmm_right_pane.jsx";

class SwmmApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const appWidth = this.props.isRightPaneEnabled ? 1302 : 1102;
    return(
      <div id="swmm-app" style={{width: appWidth}}>
        <div id="left-pane">
          <div id="pane-header">
            <div id="pane-title">Project</div>
            <ConnectedSwmmLeftPaneMenu/>
          </div>
          <ConnectedSwmmLeftPaneTreeView/>
          <div id="left-pane-list-header">
          </div>
          <ConnectedSwmmLeftPaneList/>
        </div>
        <div id="main-pane">
          <div id="pane-header">
          </div>
          <div id="main-pane-body">
            <ConnectedSwmmCanvas/>
          </div>
        </div>
        {this.props.isRightPaneEnabled && <ConnectedSwmmRightPane/>}
      </div>
    );
  }
}

SwmmApp.propTypes = {
  isRightPaneEnabled: PropTypes.bool.isRequired,
};

const isRightPaneVisible = state => {
  const isRightPaneEnabled = (state && state.ui && state.ui.isRightPaneEnabled) || false;
  const isRightPanePinned = (state && state.ui && state.ui.isRightPanePinned) || false;
  return isRightPaneEnabled || isRightPanePinned;
};

const ConnectedSwmmApp = connect(
  state => ({ isRightPaneEnabled: isRightPaneVisible(state) }),
  () => ({})
)(SwmmApp);

export default ConnectedSwmmApp;