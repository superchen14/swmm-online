import {Pollutant} from "./types";

function createPollutant(name: string, unit: string, rainWaterConcentration: number): Pollutant {
  return {name, unit, rainWaterConcentration};
}

export default createPollutant;
