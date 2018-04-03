import {LandUse, Buildup} from "./types";

function createLandUse(name: string, interval: number, availability: number, lastSwept: number, buildups: Buildup[]): LandUse {
  return {name, interval, availability, lastSwept, buildups};
}

export default createLandUse;
