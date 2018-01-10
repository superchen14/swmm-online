import {Pollutant} from "./types";

function createPollutant(name: string, unit: string): Pollutant {
  return {name, unit};
}

export default createPollutant;
