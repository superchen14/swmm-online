import React from "react";
import { connect } from "react-redux";
import ConnectedSwmmCanvas from "./swmm_canvas.jsx";
import ConnectedSwmmLeftPaneMenu from "./swmm_left_pane_menu.jsx";
import ConnectedSwmmLeftPaneTreeView from "./swmm_left_pane_treeview.jsx";
import ConnectedSwmmLeftPaneList from "./swmm_left_pane_list.jsx";

class SwmmApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="swmm-app">
        <div id="left-pane">
          <div id="left-pane-header">
            <div id="left-pane-title">Project</div>
            <ConnectedSwmmLeftPaneMenu/>
          </div>
          <ConnectedSwmmLeftPaneTreeView/>
          <div id="left-pane-list-header">
          </div>
          <ConnectedSwmmLeftPaneList/>
        </div>
        <div id="main-pane">
          <div id="main-pane-header">
          </div>
          <div id="main-pane-body">
            <ConnectedSwmmCanvas/>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedSwmmApp = connect(
  state => ({ project: state ? state.project : {} }),
  () => ({})
)(SwmmApp);

export default ConnectedSwmmApp;