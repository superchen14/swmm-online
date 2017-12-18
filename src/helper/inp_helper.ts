import {Point, Node, Link, Subcatchment, Project} from "../swmm_model/types";
import createPoint from "../swmm_model/point";
import createJunction from "../swmm_model/junction";
import createOutfall from "../swmm_model/outfall";
import createConduit from "../swmm_model/conduit";
import createDivider from "../swmm_model/divider";
import createSubcatchment from "../swmm_model/subcatchment";
import createProject from "../swmm_model/project";

const isCommentLine = line => line.startsWith(";;");
const isEmptyLine = line => line.trim().length === 0;
const isUsefulLine = line => !isCommentLine(line) && !isEmptyLine(line);
const isTitleLine = line => line.startsWith("[") && line.endsWith("]");

function parseCoordinates(lines) {
  const idPointMaps = {};

  lines.forEach(line => {
    const items = line.match(/[^ ]+/g);
    const x = Number.parseFloat(items[1]);
    const y = Number.parseFloat(items[2]);
    idPointMaps[items[0]] = createPoint(x, y);
  });

  return idPointMaps;
}

function parseVertices(lines) {
  const idVerticesMaps = {};
  lines.forEach(line => {
    const items = line.match(/[^ ]+/g);
    const id = items[0];
    const x = Number.parseFloat(items[1]);
    const y = Number.parseFloat(items[2]);

    if (id in idVerticesMaps) {
      idVerticesMaps[id].push(createPoint(x, y));
    } else {
      idVerticesMaps[id] = [createPoint(x, y)];
    }
  });

  return idVerticesMaps;
}

function parseJunction(line, idPointsMap): Node {
  const items = line.match(/[^ ]+/g);
  const junctionName = items[0];
  const elevation = Number.parseFloat(items[1]);

  const position = idPointsMap[junctionName];
  return createJunction(junctionName, position);
}

function parseOutfall(line, idPointsMap): Node {
  const items = line.match(/[^ ]+/g);
  const outfallName = items[0];
  const position = idPointsMap[outfallName];
  return createOutfall(outfallName, position);
}

function parseDivider(line, idPointsMap): Node {
  const items = line.match(/[^ ]+/g);
  const dividerName = items[0];
  const position = idPointsMap[dividerName];
  return createDivider(dividerName, position);
}

function parseConduit(line, idVerticesMap, nodes): Link {
  const items = line.match(/[^ ]+/g);
  const conduitName = items[0];
  const inletNode = nodes.find(node => node.name === items[1]);
  const outletNode = nodes.find(node => node.name === items[2]);

  return createConduit(conduitName, inletNode, outletNode, idVerticesMap[conduitName] || []);
}

function parseSubcatchment(line, idPolygonsMap): Subcatchment {
  const items = line.match(/[^ ]+/g);
  const subcatchmentName = items[0];

  return createSubcatchment(subcatchmentName, idPolygonsMap[subcatchmentName]);
}

class INPhelper {
  private text: string;

  constructor(inpText) {
    this.text = inpText;
    this.parse = this.parse.bind(this);
  }

  parse() {
    let lines = this.text.split(/\r\n|\n/);
    lines = lines.filter(isUsefulLine);

    const inpData = {};
    let dataTitle = "";
    let dataLines = [];
    lines.forEach(line => {
      if (isTitleLine(line)) {
        if (dataTitle.length > 0) {
          inpData[dataTitle] = dataLines;
        }
        dataTitle = line.slice(1, line.length - 1);
        dataLines = [];
      } else {
        dataLines.push(line);
      }
    });

    const project: Project = createProject();

    let title = "COORDINATES";
    const idPointsMap = parseCoordinates(inpData[title]);

    title = "JUNCTIONS";
    const junctionLines = inpData[title] || [];
    project.junctions = junctionLines.map(line => parseJunction(line, idPointsMap));

    title = "OUTFALLS";
    const outfallLines = inpData[title] || [];
    project.outfalls = outfallLines.map(line => parseOutfall(line, idPointsMap));

    title = "DIVIDERS";
    const dividersLines = inpData[title] || [];
    project.dividers = dividersLines.map(line => parseDivider(line, idPointsMap));

    title = "VERTICES";
    const idVerticesMap = parseVertices(inpData[title] || []);

    title = "CONDUITS";
    const nodes = (project.junctions).concat(project.outfalls);
    const conduitLines = inpData[title] || [];
    project.conduits = conduitLines.map(line => parseConduit(line, idVerticesMap, nodes));

    title = "Polygons";
    const idPolygonsMap = parseVertices(inpData[title] || []);
    title = "SUBCATCHMENTS";
    const subcatchmentLines = inpData[title] || [];
    project.subcatchments = subcatchmentLines.map(line => parseSubcatchment(line, idPolygonsMap));

    return project;
  }
}

export default INPhelper;
