import {LandUse, Buildup, Washoff} from "./types";

function createLandUse(name: string, interval: number, availability: number, lastSwept: number, buildups: Buildup[], washoffs: Washoff[]): LandUse {
  return {name, interval, availability, lastSwept, buildups, washoffs};
}

export default createLandUse;
