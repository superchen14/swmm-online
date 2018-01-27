import {Point, Node, Link, Conduit, Subcatchment, Pollutant, Project} from "../swmm_model/types";
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
import createPollutant from "../swmm_model/pollutant";
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

function parseTreatments(lines) {
  const idTreatments = {};
  lines.forEach(line => {
    const items = line.match(/[^ ]+/g);
    const nodeName = items[0];
    const pollutantName = items[1];
    line = line.replace(nodeName, "");
    line = line.replace(pollutantName, "");
    const expression = line.trim();
    if (nodeName in idTreatments) {
      idTreatments[nodeName].push({pollutantName, expression});
    } else {
      idTreatments[nodeName] = [{pollutantName, expression}];
    }
  });

  return idTreatments;
}

function parseVertices(lines) {
  const idVerticesMap = {};
  lines.forEach(line => {
    const items = line.match(/[^ ]+/g);
    const id = items[0];
    const x = Number.parseFloat(items[1]);
    const y = Number.parseFloat(items[2]);

    if (id in idVerticesMap) {
      idVerticesMap[id].push(createPoint(x, y));
    } else {
      idVerticesMap[id] = [createPoint(x, y)];
    }
  });

  return idVerticesMap;
}

function parseLosses(lines) {
  const idLossMap = {};

  lines.forEach(line => {
    const items = line.match(/[^ ]+/g);
    const id = items[0];
    const entryLossCoefficient = Number.parseFloat(items[1]);
    const exitLossCoefficient = Number.parseFloat(items[2]);
    const averageLossCoefficient = Number.parseFloat(items[3]);
    const seepageLossRate = Number.parseFloat(items[4]);
    const flapGate = items[4] === "YES";

    idLossMap[id] = {entryLossCoefficient, exitLossCoefficient, averageLossCoefficient, flapGate, seepageLossRate};
  });

  return idLossMap;
}

function parseJunction(line, idPointsMap, idTreatmentsMap): Node {
  const items = line.match(/[^ ]+/g);
  const junctionName = items[0];
  const invertElevation = Number.parseFloat(items[1]);
  const maxWaterDepth = Number.parseFloat(items[2]);
  const initialWaterDepth = Number.parseFloat(items[3]);
  const surchargeWaterDepth = Number.parseFloat(items[4]);
  const pondedWaterArea = Number.parseFloat(items[5]);
  const treatments = idTreatmentsMap[junctionName] || [];

  const position = idPointsMap[junctionName];
  return createJunction(
    junctionName,
    position,
    invertElevation,
    treatments,
    maxWaterDepth,
    initialWaterDepth,
    surchargeWaterDepth,
    pondedWaterArea
  );
}

function parseOutfall(line, idPointsMap, idTreatmentsMap): Node {
  const items = line.match(/[^ ]+/g);
  const outfallName = items[0];
  const position = idPointsMap[outfallName];
  const invertElevation = Number.parseFloat(items[1]);
  const treatments = idTreatmentsMap[outfallName] || [];
  return createOutfall(outfallName, position, invertElevation, treatments);
}

function parseDivider(line, idPointsMap, idTreatmentsMap): Node {
  const items = line.match(/[^ ]+/g);
  const dividerName = items[0];
  const position = idPointsMap[dividerName];
  const invertElevation = Number.parseFloat(items[1]);
  const treatments = idTreatmentsMap[dividerName] || [];
  return createDivider(dividerName, position, invertElevation, treatments);
}

function parseStorage(line, idPointsMap, idTreatmentsMap): Node {
  const items = line.match(/[^ ]+/g);
  const storageName = items[0];
  const position = idPointsMap[storageName];
  const invertElevation = Number.parseFloat(items[1]);
  const treatments = idTreatmentsMap[storageName] || [];
  return createStorage(storageName, position, invertElevation, treatments);
}

function parseConduit(line, idVerticesMap, idLossMap, nodes): Conduit {
  const items = line.match(/[^ ]+/g);
  const conduitName = items[0];
  const inletNode = nodes.find(node => node.name === items[1]);
  const outletNode = nodes.find(node => node.name === items[2]);
  const length = Number.parseFloat(items[3]);
  const roughness = Number.parseFloat(items[4]);
  const inletOffset = Number.parseFloat(items[5]);
  const outletOffset = Number.parseFloat(items[6]);
  const initFlow = Number.parseFloat(items[7]);
  const maxFlow = Number.parseFloat(items[8]);
  let loss = {
    entryLossCoefficient: 0,
    exitLossCoefficient: 0,
    averageLossCoefficient: 0,
    seepageLossRate: 0,
    flapGate: false
  };
  if (conduitName in idLossMap) {
    loss = idLossMap[conduitName];
  }

  return createConduit(
    conduitName,
    inletNode,
    outletNode,
    idVerticesMap[conduitName] || [],
    length,
    roughness,
    inletOffset,
    outletOffset,
    initFlow,
    maxFlow,
    loss
  );
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

function parseSubcatchment(line, idPolygonsMap, nodes): Subcatchment {
  const items = line.match(/[^ ]+/g);
  const subcatchmentName = items[0];
  const outletNode = nodes.find(n => n.name === items[2]);

  return createSubcatchment(subcatchmentName, idPolygonsMap[subcatchmentName], outletNode);
}

function parsePollutant(line: string): Pollutant {
  const items = line.match(/[^ ]+/g);
  const pollutantName = items[0];
  const unit = items[1];
  const concentrationInRainWater = Number.parseFloat(items[2]);
  const concentrationInGroundWater = Number.parseFloat(items[3]);
  const concentrationInII = Number.parseFloat(items[4]);
  const concentrationInDWF = Number.parseFloat(items[9]);
  const decayCoefficient = Number.parseFloat(items[5]);
  const concentrationInit = Number.parseFloat(items[10]);
  const snowOnly = items[6] === "YES";
  const copollutantName = items[7] === "*" ? "" : items[7];
  const copollutantFraction = Number.parseFloat(items[8]);
  return createPollutant(
    pollutantName,
    unit,
    concentrationInRainWater,
    concentrationInGroundWater,
    concentrationInII,
    concentrationInDWF,
    concentrationInit,
    decayCoefficient,
    snowOnly,
    copollutantName,
    copollutantFraction
  );
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

    title = "TREATMENT";
    const treatmentLines = inpData[title] || [];
    const idTreatmentsMap = parseTreatments(treatmentLines);

    title = "JUNCTIONS";
    const junctionLines = inpData[title] || [];
    project.junctions = junctionLines.map(line => parseJunction(line, idPointsMap, idTreatmentsMap));

    title = "OUTFALLS";
    const outfallLines = inpData[title] || [];
    project.outfalls = outfallLines.map(line => parseOutfall(line, idPointsMap, idTreatmentsMap));

    title = "DIVIDERS";
    const dividerLines = inpData[title] || [];
    project.dividers = dividerLines.map(line => parseDivider(line, idPointsMap, idTreatmentsMap));

    title = "STORAGE";
    const storageUnitLines = inpData[title] || [];
    project.storages = storageUnitLines.map(line => parseStorage(line, idPointsMap, idTreatmentsMap));

    title = "VERTICES";
    const idVerticesMap = parseVertices(inpData[title] || []);

    const nodes = (project.junctions).concat(project.outfalls).concat(project.dividers).concat(project.storages);

    title = "LOSSES";
    const idLossMap = parseLosses(inpData[title] || []);

    title = "CONDUITS";
    const conduitLines = inpData[title] || [];
    project.conduits = conduitLines.map(line => parseConduit(line, idVerticesMap, idLossMap, nodes));

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

    title = "POLLUTANTS";
    const pollutantLines = inpData[title] || [];
    project.pollutants = pollutantLines.map(line => parsePollutant(line));

    title = "Polygons";
    const idPolygonsMap = parseVertices(inpData[title] || []);
    title = "SUBCATCHMENTS";
    const subcatchmentLines = inpData[title] || [];
    project.subcatchments = subcatchmentLines.map(line => parseSubcatchment(line, idPolygonsMap, nodes));

    return project;
  }
}

export default INPhelper;
