import {Pollutant} from "./types";

function createPollutant(
  name: string,
  unit: string,
  rainWaterConcentration: number,
  groundWaterConcentration: number,
  iiConcentration: number,
): Pollutant {
  return {
    name,
    unit,
    rainWaterConcentration,
    groundWaterConcentration,
    iiConcentration
  };
}

export default createPollutant;
