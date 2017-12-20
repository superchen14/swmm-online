require("../../node_modules/bootstrap/dist/css/bootstrap.css");
require("../../styles/style.css");

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import ConnectedSwmmApp from "./swmm_app.jsx";
import GraphHelper from "../helper/graph_helper";
import CONSTS from "./consts";

const reducer = (state, action) => {
  let isRightPanePinned = (state && state.ui && state.ui.isRightPanePinned) || false;
  switch(action.type) {
    case CONSTS.LOAD_PROJECT:
      return {project: action.project, graphHelper: new GraphHelper(action.project)};
    case CONSTS.SET_ACTIVE_FEATURE:
      let newState = Object.assign({}, state);
      newState.ui = {activeFeature: action.activeFeature, activeId: "", isRightPaneEnabled: false, isRightPanePinned};
      return newState;
    case CONSTS.SET_ACTIVE_ITEM:
      newState = Object.assign({}, state);
      const isSameId = state.ui && state.ui.activeId && state.ui.activeId === action.activeId;
      let activeId = isSameId ? "" : action.activeId;
      let activeFeature = action.activeFeature;
      newState.ui = {activeId, activeFeature, isRightPaneEnabled: false, isRightPanePinned};
      return newState;
    case CONSTS.EDIT_ACTIVE_ITEM:
      newState = Object.assign({}, state);
      activeId = action.activeId;
      activeFeature = action.activeFeature;
      newState.ui = {activeId, activeFeature, isRightPaneEnabled: true, isRightPanePinned};
      return newState;
    case CONSTS.TOGGLE_PIN_RIGHT_PANE:
      newState = Object.assign({}, state);
      if (newState && newState.ui) {
        newState.ui.isRightPanePinned = !newState.ui.isRightPanePinned;
      }
      return newState;
    default:
      return state;
  }
};

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedSwmmApp/>
  </Provider>,
  document.getElementById('swmm-online')
);