import {Node, Point} from "./types";

function createDivider(name: string, position: Point, invertElevation: number): Node {
  return {name, position, invertElevation};
}

export default createDivider;
