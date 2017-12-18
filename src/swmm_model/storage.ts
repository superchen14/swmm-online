import {Node, Point} from "./types";

function createStorage(name: string, position: Point): Node {
  return {name, position};
}

export default createStorage;
