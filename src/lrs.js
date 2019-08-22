import { importToArray } from 'import-to-array'
import { createStore } from "link-lib"
import { register } from 'link-redux'
import { Literal } from 'rdflib'
import * as Rdflib from "rdflib";
import * as React from "react";

// import { LinkDevTools } from "./helpers/LinkDevTools";
import { createMiddleware } from "./middleware";
// import * as ontology from "./ontology";
import * as views from './views'
import { ns } from './ns'

const Namespace = Rdflib.Namespace;
const app = Namespace("http://localhost:8080/")

export const lrs = createStore({}, createMiddleware());
lrs.namespaces.app = app;

importToArray(views).forEach((component) => lrs.registerAll(register(component)))

lrs.store.addQuads([
  [app("stories/1"), ns.rdf("type"), app("Story")],
  [app("stories/1"), ns.rdf("type"), ns.rdf("Bag")],
  [app("stories/1"), ns.schema("name"), new Literal("Die wow factory")],
  [app("stories/1"), ns.rdfs("member"), app("poi/1")],
  [app("stories/1"), ns.rdfs("member"), app("poi/2")],

  [app("poi/1"), ns.rdf("type"), app("Poi")],
  [app("poi/1"), ns.schema("latitude"), Literal.fromNumber(52.370216)],
  [app("poi/1"), ns.schema("longitude"), Literal.fromNumber(4.895168)],

  [app("poi/2"), ns.rdf("type"), app("Poi")],
  [app("poi/2"), ns.schema("latitude"), Literal.fromNumber(52.362206)],
  [app("poi/2"), ns.schema("longitude"), Literal.fromNumber(4.895163)],
])

// importToArray(ontology).forEach((o) => {
//   LRS.addOntologySchematics(o);
//   (LRS as any).store.addStatements(o);
// });

Object.defineProperty(window, "LRS", {
  value: lrs,
  writable: false,
});
// if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
//   window.dev = new LinkDevTools("");
// }
