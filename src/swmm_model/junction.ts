import {Junction, Point, Subcatchment, Treatment} from "./types";

function createJunction(
  name: string,
  position: Point,
  invertElevation: number,
  treatments: Treatment[],
  maxWaterDepth: number,
  initialWaterDepth: number,
  surchargeWaterDepth: number,
  pondedWaterArea: number
): Junction {
  return {
    name,
    position,
    invertElevation,
    treatments,
    maxWaterDepth,
    initialWaterDepth,
    surchargeWaterDepth,
    pondedWaterArea
  };
}

export default createJunction;
