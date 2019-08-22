import { BlankNode, Literal, NamedNode } from "rdflib"

import { ns } from "../ns";

export const mapsMiddleware = (store) => {
  console.log('Loaded maps middelware')

  store.actions.maps = {
    addMarker: (latlng) => store.exec(ns.app(`actions/addMarker?lat=${latlng.lat}&lon=${latlng.lng}`)),
    toggleMarker: (subject) => store.exec(ns.app(`actions/toggleMarker?marker=${subject.value}`)),
  };

  /** Creates a delta update which adds a marker to a story */
  const addMarker = (lat, lon) => {
    const nextMarker = new BlankNode()

    return [
      [ns.app("stories/1"), ns.rdfs("member"), nextMarker, ns.ll("add")],

      [nextMarker, ns.rdf("type"), ns.app("Poi"), ns.ll("add")],
      [nextMarker, ns.schema("latitude"), Literal.fromNumber(lat), ns.ll("add")],
      [nextMarker, ns.schema("longitude"), Literal.fromNumber(lon), ns.ll("add")],
    ];
  }

  const selectedList = ns.app("selectedResources")
  store.store.addQuads([
    [selectedList, ns.rdf("type"), ns.rdf("Bag")],
  ])

  /** Creates a delta update which toggles a marker from the selection list */
  const toggleMarker = (marker) => {
    if (store.getResourceProperties(selectedList, ns.rdfs("member")).includes(marker)) {
      return [
        [selectedList, ns.rdfs("member"), marker, ns.ll("slice")],
      ]
    } else {
      return [
        [selectedList, ns.rdfs("member"), marker, ns.ll("add")],
      ]
    }
  }
  /**
   * Middleware handler
   */
  return (next) => (iri, opts) => {
    if (!iri.value.startsWith(ns.app("").value)) {
      return next(iri, opts);
    }

    if (iri.value.startsWith(ns.app("actions/addMarker").value)) {
      const search = new URL(iri.value).searchParams;
      const lat = Number(search.get("lat"));
      const lon = Number(search.get("lon"));

      return store.processDelta(addMarker(lat, lon), true)
    }
    if (iri.value.startsWith(ns.app("actions/toggleMarker").value)) {
      const search = new URL(iri.value).searchParams;
      const marker = search.get("marker").startsWith("http")
        ? new NamedNode(search.get("marker"))
        : new BlankNode(search.get("marker"));

      return store.processDelta(toggleMarker(marker), true)
    }

    return next(iri, opts);
  };
};
