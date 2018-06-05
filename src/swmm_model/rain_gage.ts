import {RainGage, Point} from "./types";

function createRainGage(name: string, position: Point): RainGage {
  return {name, position};
}

export default createRainGage;
