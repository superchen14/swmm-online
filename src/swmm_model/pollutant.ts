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
  snowOnly: boolean,
  copollutantName: string,
  copollutantFraction: number
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
    snowOnly,
    copollutantName,
    copollutantFraction
  };
}

export default createPollutant;
