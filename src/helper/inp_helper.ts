import {Point, Node, Link, Subcatchment, Project} from "../swmm_model/types";
import createPoint from "../swmm_model/point";
import createJunction from "../swmm_model/junction";
import createOutfall from "../swmm_model/outfall";
import createDivider from "../swmm_model/divider";
import createStorage from "../swmm_model/storage";
import createConduit from "../swmm_model/conduit";
import createPump from "../swmm_model/pump";
import createOrifice from "../swmm_model/orifice";
import createWeir from "../swmm_model/weir";
import createOutlet from "../swmm_model/outlet";
import createSubcatchment from "../swmm_model/subcatchment";
import createProject from "../swmm_model/project";

const isCommentLine = line => line.startsWith(";");
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
  const invertElevation = Number.parseFloat(items[1]);
  const maxWaterDepth = Number.parseFloat(items[2]);
  const initialWaterDepth = Number.parseFloat(items[3]);
  const surchargeWaterDepth = Number.parseFloat(items[4]);
  const pondedWaterArea = Number.parseFloat(items[5]);

  const position = idPointsMap[junctionName];
  return createJunction(
    junctionName,
    position,
    invertElevation,
    maxWaterDepth,
    initialWaterDepth,
    surchargeWaterDepth,
    pondedWaterArea
  );
}

function parseOutfall(line, idPointsMap): Node {
  const items = line.match(/[^ ]+/g);
  const outfallName = items[0];
  const position = idPointsMap[outfallName];
  const invertElevation = Number.parseFloat(items[1]);
  return createOutfall(outfallName, position, invertElevation);
}

function parseDivider(line, idPointsMap): Node {
  const items = line.match(/[^ ]+/g);
  const dividerName = items[0];
  const position = idPointsMap[dividerName];
  const invertElevation = Number.parseFloat(items[1]);
  return createDivider(dividerName, position, invertElevation);
}

function parseStorage(line, idPointsMap): Node {
  const items = line.match(/[^ ]+/g);
  const storageUnitName = items[0];
  const position = idPointsMap[storageUnitName];
  const invertElevation = Number.parseFloat(items[1]);
  return createStorage(storageUnitName, position, invertElevation);
}

function parseConduit(line, idVerticesMap, nodes): Link {
  const items = line.match(/[^ ]+/g);
  const conduitName = items[0];
  const inletNode = nodes.find(node => node.name === items[1]);
  const outletNode = nodes.find(node => node.name === items[2]);

  return createConduit(conduitName, inletNode, outletNode, idVerticesMap[conduitName] || []);
}

function parsePump(line, idVerticesMap, nodes): Link {
  const items = line.match(/[^ ]+/g);
  const pumpName = items[0];
  const inletNode = nodes.find(node => node.name === items[1]);
  const outletNode = nodes.find(node => node.name === items[2]);

  return createPump(pumpName, inletNode, outletNode, idVerticesMap[pumpName] || []);
}

function parseOrifice(line, idVerticesMap, nodes): Link {
  const items = line.match(/[^ ]+/g);
  const orificeName = items[0];
  const inletNode = nodes.find(node => node.name === items[1]);
  const outletNode = nodes.find(node => node.name === items[2]);

  return createOrifice(orificeName, inletNode, outletNode, idVerticesMap[orificeName] || []);
}

function parseWeir(line, idVerticesMap, nodes): Link {
  const items = line.match(/[^ ]+/g);
  const weirName = items[0];
  const inletNode = nodes.find(node => node.name === items[1]);
  const outletNode = nodes.find(node => node.name === items[2]);

  return createWeir(weirName, inletNode, outletNode, idVerticesMap[weirName] || []);
}

function parseOutlet(line, idVerticesMap, nodes): Link {
  const items = line.match(/[^ ]+/g);
  const outletName = items[0];
  const inletNode = nodes.find(node => node.name === items[1]);
  const outletNode = nodes.find(node => node.name === items[2]);

  return createOutlet(outletName, inletNode, outletNode, idVerticesMap[outletName] || []);
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
    if (dataTitle.length > 0) {
      inpData[dataTitle] = dataLines;
    }

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
    const dividerLines = inpData[title] || [];
    project.dividers = dividerLines.map(line => parseDivider(line, idPointsMap));

    title = "STORAGE";
    const storageUnitLines = inpData[title] || [];
    project.storages = storageUnitLines.map(line => parseStorage(line, idPointsMap));

    title = "VERTICES";
    const idVerticesMap = parseVertices(inpData[title] || []);

    const nodes = (project.junctions).concat(project.outfalls).concat(project.dividers).concat(project.storages);

    title = "CONDUITS";
    const conduitLines = inpData[title] || [];
    project.conduits = conduitLines.map(line => parseConduit(line, idVerticesMap, nodes));

    title = "PUMPS";
    const pumpLines = inpData[title] || [];
    project.pumps = pumpLines.map(line => parsePump(line, idVerticesMap, nodes));

    title = "ORIFICES";
    const orificeLines = inpData[title] || [];
    project.orifices = orificeLines.map(line => parseOrifice(line, idVerticesMap, nodes));

    title = "WEIRS";
    const weirLines = inpData[title] || [];
    project.weirs = weirLines.map(line => parseWeir(line, idVerticesMap, nodes));

    title = "OUTLETS";
    const outletLines = inpData[title] || [];
    project.outlets = outletLines.map(line => parseOutlet(line, idVerticesMap, nodes));

    title = "Polygons";
    const idPolygonsMap = parseVertices(inpData[title] || []);
    title = "SUBCATCHMENTS";
    const subcatchmentLines = inpData[title] || [];
    project.subcatchments = subcatchmentLines.map(line => parseSubcatchment(line, idPolygonsMap));

    return project;
  }
}

export default INPhelper;
