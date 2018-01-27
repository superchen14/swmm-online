import {Point, Node, Conduit} from "./types";

function createConduit(
  name: string,
  inletNode: Node,
  outletNode: Node,
  vertices: Point[],
  length: number,
  roughness: number,
  inletOffset: number,
  outletOffset: number,
  initFlow: number,
  maxFlow: number
): Conduit {
  return {
    name,
    inletNode,
    outletNode,
    vertices,
    length,
    roughness,
    inletOffset,
    outletOffset,
    initFlow,
    maxFlow
  };
}

export default createConduit;
