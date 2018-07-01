import {RainGage, Point} from "./types";

function createRainGage(name: string, position: Point, format: string, timeInterval: string, snowCatchFactor: number): RainGage {
  return {name, position, format, timeInterval, snowCatchFactor};
}

export default createRainGage;
