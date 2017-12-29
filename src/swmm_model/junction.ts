import {Junction, Point, Subcatchment} from "./types";

function createJunction(name: string, position: Point, invertElevation: number, maxWaterDepth: number): Junction {
  return {name, position, invertElevation, maxWaterDepth};
}

export default createJunction;
