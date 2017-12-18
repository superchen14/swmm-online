import {Project} from "./types";

function createProject(): Project {
  return {junctions: [], outfalls: [], conduits: [], subcatchments: [], dividers: [], storages: []};
}

export default createProject;
