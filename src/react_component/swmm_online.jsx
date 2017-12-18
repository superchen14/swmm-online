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
  switch(action.type) {
    case CONSTS.LOAD_PROJECT:
      return {project: action.project, graphHelper: new GraphHelper(action.project)};
    case CONSTS.SET_ACTIVE_FEATURE:
      let newState = Object.assign({}, state);
      newState.ui = {activeFeature: action.activeFeature, activeId: ""};
      return newState;
    case CONSTS.SET_ACTIVE_ID:
      newState = Object.assign({}, state);
      const isSameId = state.ui && state.ui.activeId && state.ui.activeId === action.activeId;
      const activeId = isSameId ? "" : action.activeId;
      const activeFeature = action.activeFeature;
      newState.ui = {activeId, activeFeature};
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