export class SPARQLQueryDispatcher {
  constructor() {
    this.wiki_endpoint = "https://query.wikidata.org/sparql";
  }

  query(sparqlQuery) {
    const fullUrl =
      this.wiki_endpoint + "?query=" + encodeURIComponent(sparqlQuery);
    const headers = { Accept: "application/sparql-results+json" };

    return fetch(fullUrl, { headers }).then((body) => body.json());
  }
}
