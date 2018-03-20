import {TimePattern} from "./types";

function createTimePattern(name: string, patternType: string, multipliers: number[]): TimePattern {
  return {name, patternType, multipliers};
}

export default createTimePattern;
