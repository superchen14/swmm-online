import {Node, Point, Treatment} from "./types";

function createOutfall(name: string, position: Point, invertElevation: number, treatments: Treatment[]): Node {
  return {name, position, invertElevation, treatments};
}

export default createOutfall;
