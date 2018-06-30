import {RainGage, Point} from "./types";

function createRainGage(name: string, position: Point, format: string): RainGage {
  return {name, position, format};
}

export default createRainGage;
