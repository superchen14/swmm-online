import CONSTS from "./consts";

export const loadProjectAction = project => ({type: CONSTS.LOAD_PROJECT, project});
export const setActiveFeatureAction = activeFeature => ({type: CONSTS.SET_ACTIVE_FEATURE, activeFeature});
export const setActiveItemAction = (activeFeature, activeId) => ({type: CONSTS.SET_ACTIVE_ITEM, activeFeature, activeId});
export const editActiveItemAction = (activeFeature, activeId) => ({type: CONSTS.EDIT_ACTIVE_ITEM, activeFeature, activeId});
export const togglePinRightPaneAction = () => ({type: CONSTS.TOGGLE_PIN_RIGHT_PANE});
export const closeRightPaneAction = () => ({type: CONSTS.CLOSE_RIGHT_PANE});
export const updateListFilterAction = text => ({type: CONSTS.UPDATE_LIST_FILTER, text});
