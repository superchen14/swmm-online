import {Node, Point, Treatment} from "./types";

function createDivider(name: string, position: Point, invertElevation: number, treatments: Treatment[]): Node {
  return {name, position, invertElevation, treatments};
}

export default createDivider;
