import {LandUse} from "./types";

function createLandUse(name: string, interval: number, availability: number, lastSwept: number): LandUse {
  return {name, interval, availability, lastSwept};
}

export default createLandUse;
