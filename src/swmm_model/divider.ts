import {Node, Point} from "./types";

function createDivider(name: string, position: Point): Node {
  return {name, position};
}

export default createDivider;
