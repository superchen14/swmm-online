interface Point {
  x: number;
  y: number;
}

interface Entity {
  name: string;
}

interface Node extends Entity {
  position: Point;
  invertElevation: number;
}

interface Junction extends Node {
}

interface Link extends Entity {
  inletNode: Node;
  outletNode: Node;
  vertices: Point[];
}

interface Subcatchment extends Entity {
  vertices: Point[];
}

interface Project
{
  junctions: Junction[];
  outfalls: Node[];
  dividers: Node[];
  storages: Node[];
  conduits: Link[];
  pumps: Link[];
  orifices: Link[];
  weirs: Link[];
  outlets: Link[];
  subcatchments: Subcatchment[];
}

export {Point, Entity, Node, Junction, Link, Subcatchment, Project};