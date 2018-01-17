import {Node, Point, Treatment} from "./types";

function createStorage(name: string, position: Point, invertElevation: number, treatments: Treatment[]): Node {
  return {name, position, invertElevation, treatments};
}

export default createStorage;
