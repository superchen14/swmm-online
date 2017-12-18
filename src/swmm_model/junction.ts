import {Node, Point} from "./types";

function createJunction(name: string, position: Point): Node {
  return {name, position};
}

export default createJunction;
