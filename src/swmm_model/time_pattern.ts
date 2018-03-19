import {TimePattern} from "./types";

function createTimePattern(name: string, patternType: string): TimePattern {
  return {name, patternType};
}

export default createTimePattern;
