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
  treatments: Treatment[];
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

interface Conduit extends Link {
  length: number;
  roughness: number;
}

interface Subcatchment extends Entity {
  position: Point;
  vertices: Point[];
  outletNode: Node;
}

interface Pollutant extends Entity {
  unit: string;
  concentrationInRainWater: number;
  concentrationInGroundWater: number;
  concentrationInII: number;
  concentrationInDWF: number;
  concentrationInit: number;
  decayCoefficient: number;
  snowOnly: boolean;
  copollutantName: string;
  copollutantFraction: number;
}

interface Treatment {
  pollutantName: string;
  expression: string;
}

interface Project
{
  junctions: Junction[];
  outfalls: Node[];
  dividers: Node[];
  storages: Node[];
  conduits: Conduit[];
  pumps: Link[];
  orifices: Link[];
  weirs: Link[];
  outlets: Link[];
  pollutants: Pollutant[];
  subcatchments: Subcatchment[];
}

export {Point, Entity, Node, Junction, Link, Conduit, Subcatchment, Pollutant, Treatment, Project};