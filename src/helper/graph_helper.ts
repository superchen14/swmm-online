import {Project, Point, Node, Subcatchment} from "../swmm_model/types";
import createPoint from "../swmm_model/point";

class GraphHelper {
  private leftBottom: Point = createPoint(0, 0);
  private rightTop: Point = createPoint(0, 0);
  private width: number = 0;
  private height: number = 0;
  private canvasWidth: number = 900;
  private canvasHeight: number = 600;
  private canvasXOffset: number = 0;
  private canvasYOffset: number = 0;

  constructor(project: Project) {
    this.calculateBoundingBox = this.calculateBoundingBox.bind(this);
    this.getPointOnCanvas = this.getPointOnCanvas.bind(this);
    this.calculateBoundingBox(project);
  }

  public getPointOnCanvas(point: Point): Point {
    const x = (point.x - this.leftBottom.x) / this.width * this.canvasWidth + this.canvasXOffset;
    let y = (point.y - this.leftBottom.y) / this.height * this.canvasHeight + this.canvasYOffset;
    y = 600 - y;
    return createPoint(x, y);
  }

  private calculateBoundingBox(project: Project): void {
    const junctions: Node[] = project.junctions || [];
    const outfalls: Node[] = project.outfalls || [];
    const dividers: Node[] = project.dividers || [];
    const storages: Node[] = project.storages || [];
    const subcatchments: Subcatchment[] = project.subcatchments || [];
    const nodes = junctions.concat(outfalls).concat(dividers).concat(storages);
    const rainGages = project.rainGages || [];

    let allPts = nodes.map(n => n.position);
    subcatchments.forEach(s => { allPts = allPts.concat(s.vertices); });
    allPts.concat(rainGages.map(rg => rg.position));

    const margin = 10;

    const xArray: number[] = allPts.map(pt => pt.x);
    let minX: number = Math.min(...xArray);
    let maxX: number = Math.max(...xArray);
    const width = maxX - minX;
    minX = minX - margin;
    maxX = maxX + margin;

    const yArray: number[] = allPts.map(pt => pt.y);
    let minY: number = Math.min(...yArray);
    let maxY: number = Math.max(...yArray);
    const height = maxY - minY;
    minY = minY - margin;
    maxY = maxY + margin;

    this.leftBottom = createPoint(minX, minY);
    this.rightTop = createPoint(maxX, maxY);
    this.width = maxX - minX;
    this.height = maxY - minY;

    if (width / height > 9 / 6) {
      // we do not need to change canvasWidth
      // but we need to change canvasHeight, canvasYOffset
      this.canvasHeight = this.canvasWidth / this.width * this.height;
      this.canvasYOffset = (600 - this.canvasHeight) / 2;
    } else {
      // we do not need to change canvasHeight
      // but we need to change canvasWidth, canvasXOffset
      this.canvasWidth = this.canvasHeight / this.height * this.width;
      this.canvasXOffset = (900 - this.canvasWidth) / 2;
    }
  }
}

export default GraphHelper;
