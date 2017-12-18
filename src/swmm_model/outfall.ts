import {Node, Point} from "./types";

function createOutfall(name: string, position: Point): Node {
  return {name, position};
}

export default createOutfall;
