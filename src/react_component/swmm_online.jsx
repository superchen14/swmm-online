require("../../styles/style.scss");

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import ConnectedSwmmApp from "./swmm_app.jsx";
import sampleInpText from "../helper/sample_inp.es6";
import GraphHelper from "../helper/graph_helper";
import INPHelper from "../helper/inp_helper";
import CONSTS from "./consts";

const reducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case CONSTS.LOAD_PROJECT:
      newState.project = action.project;
      newState.graphHelper = new GraphHelper(action.project);
      newState.ui.activeFeature = CONSTS.NONE_FEATURE;
      newState.ui.activeId = CONSTS.EMPTY_STRING;
      return newState;
    case CONSTS.SET_ACTIVE_FEATURE:
      newState.ui.activeFeature = action.activeFeature;
      newState.ui.activeId = CONSTS.EMPTY_STRING;
      return newState;
    case CONSTS.SET_ACTIVE_ITEM:
      const isSameId = state.ui.activeId === action.activeId;
      newState.ui.activeId = isSameId ? CONSTS.EMPTY_STRING : action.activeId;
      newState.ui.activeFeature = action.activeFeature;
      newState.ui.isRightPaneEnabled = false;
      return newState;
    case CONSTS.EDIT_ACTIVE_ITEM:
      newState.ui.isRightPaneEnabled = true;
      return newState;
    case CONSTS.TOGGLE_PIN_RIGHT_PANE:
      newState.ui.isRightPanePinned = !newState.ui.isRightPanePinned;
      return newState;
    case CONSTS.CLOSE_RIGHT_PANE:
      newState.ui.isRightPanePinned = false;
      newState.ui.isRightPaneEnabled = false;
      return newState;
    case CONSTS.UPDATE_LIST_FILTER:
      newState.ui.listFilter = action.text;
      return newState;
    default:
      return state;
  }
};

const inpHelper = new INPHelper(sampleInpText);
const project = inpHelper.parse();
const initState = {
  project,
  graphHelper: new GraphHelper(project),
  ui: {
    activeFeature: CONSTS.NONE_FEATURE,
    activeId: CONSTS.EMPTY_STRING,
    isRightPaneEnabled: false,
    isRightPanePinned: false,
    listFilter: CONSTS.EMPTY_STRING,
  }
};
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || (a => a);
const store = createStore(reducer, initState, enhancer(applyMiddleware()));
ReactDOM.render(
  <Provider store={store}>
    <ConnectedSwmmApp/>
  </Provider>,
  document.getElementById('swmm-online')
);