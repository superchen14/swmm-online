import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ConnectedSwmmCanvas from "./swmm_canvas.jsx";
import ConnectedSwmmLeftPaneMenu from "./swmm_left_pane_menu.jsx";
import ConnectedSwmmLeftPaneTreeView from "./swmm_left_pane_treeview.jsx";
import ConnectedSwmmLeftPaneList from "./swmm_left_pane_list.jsx";
import ConnectedSwmmRightPane from "./swmm_right_pane.jsx";
import { updateListFilterAction } from "./actions";

class SwmmApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const appWidth = this.props.isRightPanePinned ? 1302 : 1102;
    return(
      <div id="swmm-app" style={{width: appWidth}}>
        <div id="swmm-app-dock">
        <div id="left-pane">
          <div id="pane-header">
            <div id="pane-title">Project</div>
            <ConnectedSwmmLeftPaneMenu/>
          </div>
          <ConnectedSwmmLeftPaneTreeView/>
          <div id="left-pane-list-header">
          </div>
          <div>
            <p className="control has-icons-left">
              <input className="input is-small" type="text" placeholder="search" onInput={this.props.updateListFilter} value={this.props.listFilter}/>
              <span className="icon is-small is-left glyphicon glyphicon-filter">
              </span>
            </p>
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
        {this.props.isRightPaneVisible && <ConnectedSwmmRightPane/>}
        </div>
      </div>
    );
  }
}

SwmmApp.propTypes = {
  isRightPanePinned: PropTypes.bool.isRequired,
  isRightPaneVisible: PropTypes.bool.isRequired,
  updateListFilter: PropTypes.func.isRequired,
  listFilter: PropTypes.string.isRequired,
};

const isRightPanePinned = state => (state && state.ui && state.ui.isRightPanePinned) || false;

const isRightPaneEnabled = state => (state && state.ui && state.ui.isRightPaneEnabled) || false;

const isRightPaneVisible = state => isRightPaneEnabled(state) || isRightPanePinned(state);

const ConnectedSwmmApp = connect(
  state => ({
    isRightPanePinned: isRightPanePinned(state),
    isRightPaneVisible: isRightPaneVisible(state),
    listFilter: state && state.ui && state.ui.listFilter ? state.ui.listFilter : "",
  }),
  dispatch => ({
    updateListFilter: e => dispatch(updateListFilterAction(e.target.value)),
  })
)(SwmmApp);

export default ConnectedSwmmApp;