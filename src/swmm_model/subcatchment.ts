import {Point, Node, Subcatchment} from "./types";

function createSubcatchment(name: string, vertices: Point[], outletNode: Node, area: number, width: number, slope: number): Subcatchment {
  const x: number = vertices.reduce((acc, v) => acc + v.x, 0) / vertices.length;
  const y: number = vertices.reduce((acc, v) => acc + v.y, 0) / vertices.length;
  const position: Point = {x, y};
  return {name, vertices, position, outletNode, area, width, slope};
}

export default createSubcatchment;
