import {Point, Node, Link} from "./types";

function createOutlet(name: string, inletNode: Node, outletNode: Node, vertices: Point[]): Link {
  return {name, inletNode, outletNode, vertices};
}

export default createOutlet;
