import {Point, Node, Conduit} from "./types";

function createConduit(name: string, inletNode: Node, outletNode: Node, vertices: Point[], length: number): Conduit {
  return {name, inletNode, outletNode, vertices, length};
}

export default createConduit;
