import {Point, Node, Link} from "./types";

function createWeir(name: string, inletNode: Node, outletNode: Node, vertices: Point[]): Link {
  return {name, inletNode, outletNode, vertices};
}

export default createWeir;
