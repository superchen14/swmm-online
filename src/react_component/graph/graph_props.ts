import CONSTS from "../consts";
const getGraphProps = isActive => ({
  stroke: isActive ? CONSTS.SELECTED_STROKE_COLOR : CONSTS.DEFAULT_STROKE_COLOR,
  strokeWidth: isActive ? CONSTS.SELECTED_STROKE_WIDTH : CONSTS.DEFAULT_STROKE_WIDTH,
  scale: isActive ? CONSTS.SELECTED_SCALE : CONSTS.DEFAULT_SCALE,
  fill: isActive ? CONSTS.SELECTED_FILL_COLOR : CONSTS.DEFAULT_FILL_COLOR
});

export default getGraphProps;
