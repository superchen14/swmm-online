import {Node, Point} from "./types";

function createStorage(name: string, position: Point, invertElevation: number): Node {
  return {name, position, invertElevation};
}

export default createStorage;
