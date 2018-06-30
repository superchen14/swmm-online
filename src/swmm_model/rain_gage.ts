import {RainGage, Point} from "./types";

function createRainGage(name: string, position: Point, format: string, timeInterval: string): RainGage {
  return {name, position, format, timeInterval};
}

export default createRainGage;
