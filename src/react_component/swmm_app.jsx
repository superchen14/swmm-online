import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ConnectedSwmmCanvas from "./swmm_canvas.jsx";
import ConnectedSwmmHeader from "./swmm_header.jsx";
import ConnectedSwmmLeftPaneTreeView from "./swmm_left_pane_treeview.jsx";
import ConnectedSwmmLeftPaneList from "./swmm_left_pane_list.jsx";
import ConnectedSwmmRightPane from "./swmm_right_pane.jsx";
import { updateListFilterAction } from "./actions";

class SwmmApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <ConnectedSwmmHeader/>
        <div id="swmm-app">
          <div id="left-pane">
            <div id="pane-header">
            </div>
            <ConnectedSwmmLeftPaneTreeView/>
            <div id="left-pane-list-header">
            </div>
            <div>
              <p className="control has-icons-left">
                <input className="input is-small" type="text" placeholder="search" onInput={this.props.updateListFilter} value={this.props.listFilter}/>
                <span className="icon is-small is-left"><i className="fa fa-search"/></span>
              </p>
            </div>
            <ConnectedSwmmLeftPaneList/>
          </div>
          <div id="main-pane">
            <div id="pane-header">
            </div>
            <div id="main-pane-body">
              <div style={{height: 600, width: 900}}>
              <ConnectedSwmmCanvas/>
              </div>
            </div>
          </div>
          <ConnectedSwmmRightPane/>
        </div>
      </div>
    );
  }
}

SwmmApp.propTypes = {
  updateListFilter: PropTypes.func.isRequired,
  listFilter: PropTypes.string.isRequired,
};

const ConnectedSwmmApp = connect(
  state => ({
    listFilter: state && state.ui && state.ui.listFilter ? state.ui.listFilter : "",
  }),
  dispatch => ({
    updateListFilter: e => dispatch(updateListFilterAction(e.target.value)),
  })
)(SwmmApp);

export default ConnectedSwmmApp;