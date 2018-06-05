import {Project} from "./types";

function createProject(): Project {
  return {
    junctions: [],
    outfalls: [],
    conduits: [],
    dividers: [],
    storages: [],
    pumps: [],
    orifices: [],
    weirs: [],
    outlets: [],
    pollutants: [],
    subcatchments: [],
    timePatterns: [],
    landUses: [],
    rainGages: [],
  };
}

export default createProject;
