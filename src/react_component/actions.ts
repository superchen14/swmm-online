import CONSTS from "./consts";

export const loadProjectAction = project => ({type: CONSTS.LOAD_PROJECT, project});
export const setActiveFeatureAction = activeFeature => ({type: CONSTS.SET_ACTIVE_FEATURE, activeFeature});
export const setActiveItemAction = (activeFeature, activeId) => ({type: CONSTS.SET_ACTIVE_ITEM, activeFeature, activeId});
export const updateListFilterAction = text => ({type: CONSTS.UPDATE_LIST_FILTER, text});
