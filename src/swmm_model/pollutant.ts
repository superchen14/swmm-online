import {Pollutant} from "./types";

function createPollutant(name: string, unit: string, rainWaterConcentration: number, groundWaterConcentration): Pollutant {
  return {name, unit, rainWaterConcentration, groundWaterConcentration};
}

export default createPollutant;
