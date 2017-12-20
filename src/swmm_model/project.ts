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
    subcatchments: []
  };
}

export default createProject;
