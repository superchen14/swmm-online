import {Pollutant} from "./types";

function createPollutant(
  name: string,
  unit: string,
  concentrationInRainWater: number,
  concentrationInGroundWater: number,
  concentrationInII: number,
): Pollutant {
  return {
    name,
    unit,
    concentrationInRainWater,
    concentrationInGroundWater,
    concentrationInII,
  };
}

export default createPollutant;
