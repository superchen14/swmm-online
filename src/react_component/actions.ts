import CONSTS from "./consts";

export const loadProjectAction = project => ({type: CONSTS.LOAD_PROJECT, project});
export const setActiveFeatureAction = activeFeature => ({type: CONSTS.SET_ACTIVE_FEATURE, activeFeature});
export const setActiveIdAction = (activeFeature, activeId) => ({type: CONSTS.SET_ACTIVE_ID, activeFeature, activeId});
