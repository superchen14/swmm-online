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
  maxWaterDepth: number;
  initialWaterDepth: number;
  surchargeWaterDepth: number;
  pondedWaterArea: number;
}

interface Link extends Entity {
  inletNode: Node;
  outletNode: Node;
  vertices: Point[];
}

interface Subcatchment extends Entity {
  position: Point;
  vertices: Point[];
  outletNode: Node;
}

interface Pollutant extends Entity {
  unit: string;
  rainWaterConcentration: number;
  groundWaterConcentration: number;
  iiConcentration: number;
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
  pollutants: Pollutant[];
  subcatchments: Subcatchment[];
}

export {Point, Entity, Node, Junction, Link, Subcatchment, Pollutant, Project};