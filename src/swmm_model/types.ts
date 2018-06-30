interface Point {
  x: number;
  y: number;
}

interface Entity {
  name: string;
}

interface RainGage extends Entity {
  position: Point;
  format: string;
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
  inletOffset: number;
  outletOffset: number;
  initFlow: number;
  maxFlow: number;
  loss: Loss;
  section: Section;
}

interface Section {
  shape: string;
  numberOfBarrels: number;
  maximumHeight: number;
  topWidth?: number;
  bottomWidth?: number;
  leftSlope?: number;
  rightSlope?: number;
  sidewallsRemoved?: string;
  power?: number;
  roughness?: number;
  filledDepth?: number;
  triangleHeight?: number;
  bottomRadius?: number;
  topRadius?: number;
  maximumWidth?: number;
  sizeCode?: number;
}

interface Loss {
  entryLossCoefficient: number;
  exitLossCoefficient: number;
  averageLossCoefficient: number;
  seepageLossRate: number;
  flapGate: boolean;
}

interface Subcatchment extends Entity {
  position: Point;
  vertices: Point[];
  outletNode: Node;
  area: number;
  width: number;
  averageSurfaceSlope: number;
  percentOfImperviousArea: number;
  curbLength: number;
  subarea: Subarea;
}

interface Subarea {
  manningNForImperviousArea: number;
  manningNForPerviousArea: number;
  depthOfDepressionStorageOnImperviousArea: number;
  depthOfDepressionStorageOnPerviousArea: number;
  percentOfImperviousAreaWithNoDepressionStorage: number;
  subareaRouting: string;
  percentOfRunoffRoutedBetweenSubareas: number;
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

interface TimePattern extends Entity {
  patternType: string;
  multipliers: number[];
}

interface LandUse extends Entity {
  interval: number;
  availability: number;
  lastSwept: number;
  buildups: Buildup[];
  washoffs: Washoff[];
}

interface Buildup {
  pollutantName: string;
  function: string;
  maxBuildup: number;
  rateConstant: number;
  powerSatConstant: number;
  normalizer: string;
}

interface Washoff {
  pollutantName: string;
  function: string;
  coefficient: number;
  runoffExponent: number;
  cleaningEfficiency: number;
  bmpEfficiency: number;
}

interface Project {
  rainGages: RainGage[];
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
  timePatterns: TimePattern[];
  landUses: LandUse[];
}

export {Point, Entity, RainGage, Node, Junction, Link, Conduit, Section, Loss, Subcatchment, Subarea, Pollutant, Treatment, TimePattern, LandUse, Buildup, Washoff, Project};