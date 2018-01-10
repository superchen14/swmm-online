import {Pollutant} from "./types";

function createPollutant(
  name: string,
  unit: string,
  concentrationInRainWater: number,
  concentrationInGroundWater: number,
  concentrationInII: number,
  concentrationInDWF: number,
  concentrationInit: number,
  decayCoefficient: number,
  snowOnly: boolean
): Pollutant {
  return {
    name,
    unit,
    concentrationInRainWater,
    concentrationInGroundWater,
    concentrationInII,
    concentrationInDWF,
    concentrationInit,
    decayCoefficient,
    snowOnly
  };
}

export default createPollutant;
