import {Point, Node, Link} from "./types";

function createConduit(name: string, inletNode: Node, outletNode: Node, vertices: Point[]): Link {
  return {name, inletNode, outletNode, vertices};
}

export default createConduit;
