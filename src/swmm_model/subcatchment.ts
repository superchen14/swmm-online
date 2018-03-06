import {Point, Node, Subcatchment, Subarea} from "./types";

function createSubcatchment(
  name: string,
  vertices: Point[],
  outletNode: Node,
  area: number,
  width: number,
  averageSurfaceSlope: number,
  percentOfImperviousArea: number,
  curbLength: number,
  subarea: Subarea
): Subcatchment {
  const x: number = vertices.reduce((acc, v) => acc + v.x, 0) / vertices.length;
  const y: number = vertices.reduce((acc, v) => acc + v.y, 0) / vertices.length;
  const position: Point = {x, y};
  return {
    name,
    vertices,
    position,
    outletNode,
    area,
    width,
    averageSurfaceSlope,
    percentOfImperviousArea,
    curbLength,
    subarea
  };
}

export default createSubcatchment;
