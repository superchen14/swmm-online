import {Junction, Point, Subcatchment} from "./types";

function createJunction(
  name: string,
  position: Point,
  invertElevation: number,
  maxWaterDepth: number,
  initialWaterDepth: number,
  surchargeWaterDepth: number,
  pondedWaterArea: number
): Junction {
  return {
    name,
    position,
    invertElevation,
    maxWaterDepth,
    initialWaterDepth,
    surchargeWaterDepth,
    pondedWaterArea
  };
}

export default createJunction;
