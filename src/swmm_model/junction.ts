import {Junction, Point, Subcatchment} from "./types";

function createJunction(name: string, position: Point, invertElevation: number): Junction {
  return {name, position, invertElevation};
}

export default createJunction;
