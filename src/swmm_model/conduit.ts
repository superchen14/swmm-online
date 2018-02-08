import {Point, Node, Loss, Conduit, Section} from "./types";

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
  maxFlow: number,
  loss: Loss,
  section: Section
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
    maxFlow,
    loss,
    section
  };
}

export default createConduit;
