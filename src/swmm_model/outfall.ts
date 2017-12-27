import {Node, Point} from "./types";

function createOutfall(name: string, position: Point, invertElevation: number): Node {
  return {name, position, invertElevation};
}

export default createOutfall;
