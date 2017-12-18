import {Point, Subcatchment} from "./types";

function createSubcatchment(name: string, vertices: Point[]): Subcatchment {
  return {name, vertices};
}

export default createSubcatchment;
