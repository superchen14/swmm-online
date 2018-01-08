import {Pollutant} from "./types";

function createPollutant(name: string, units: string): Pollutant {
  return {name, units};
}

export default createPollutant;
