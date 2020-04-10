import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_SITES } from "../graphql/sites";
import { Card, Button } from "antd";
import {
  Site,
  HistoricPlaceStub,
  SoftwareCoStub,
  WikiResult,
} from "../common/types";
import { AppContext } from "../Context";
import {
  guardHistoricPlaceStub,
  guardSoftwareCoStub,
} from "../common/typeguards";
import JsonPre from "./common/JsonPre";

export default function Home() {
  const { data } = useQuery(ALL_SITES);
  const { setSite } = useContext(AppContext);
  const [renderSites, setRenderSites] = useState([] as Site[]);

  useEffect(() => {
    const { createApolloFetch } = require("apollo-fetch");
    const fetch = createApolloFetch({
      uri: "http://localhost:4100/graphql",
    });
    let sites: Site[] = [];
    if (data && data.allSites) {
      // Fetch stub data from knol graph
      data.allSites.data.map(async (site: Site) => {
        // site.knol_data = { test: "Test" };
        if (site.stub_knol_id) {
          let knol_data = await fetch({
            query: `
              query getStup($id: ID!) {
                Stub(id: $id){
                  id
                  title
                  ... on HistoricPlaceStub {
                     historic_place {
                      title
                      wiki_id
                      curr_area {
                        title
                      }
                    }
                  }
                  ... on SoftwareCoStub {
                    area {
                      title
                      city
                    }
                  }
                  __typename
                }
              }`,
            variables: { id: site.stub_knol_id },
          });
          let [siteknol] = knol_data.data.Stub;
          switch (siteknol.__typename) {
            case "HistoricPlaceStub":
              site.stub_data = siteknol as HistoricPlaceStub;
              break;
            case "SoftwareCoStub":
              site.stub_data = siteknol as SoftwareCoStub;
              break;
            default:
              break;
          }
        }
        sites.push(site);
        setRenderSites([...sites]);
      });
    }
  }, [data]);

  return (
    <div>
      {renderSites.map((site: Site) => (
        <Card style={{ direction: "rtl" }} title={site.name} key={site._id}>
          <JsonPre data={site} />
          {site.stub_data && guardHistoricPlaceStub(site.stub_data) && (
            <p>
              <br />
              {site.stub_data && <b>{site.stub_data.historic_place.title} </b>}
              <br /> منطقة :
              {site.stub_data && (
                <b>{site.stub_data.historic_place.curr_area.title}</b>
              )}
              <br />
              <b>WikiID: </b> {site.stub_data.historic_place.wiki_id}
              <Button
                onClick={async (e) => {
                  // Get Wikidata
                  const query = `
SELECT ?item ?itemLabel ?inventorLabel
WHERE 
{
  {?item wdt:P279 wd:Q1183543 ;
         wdt:P61 ?inventor .}
  UNION 
  {?item wdt:P31 wd:Q1183543 ;
          wdt:P61 ?inventor .}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "ar,en". }
}`;

                  let data = await fetch(
                    `https://query.wikidata.org/sparql?query=${encodeURIComponent(
                      query
                    )}`,
                    {
                      headers: {
                        Accept: "application/sparql-results+json",
                      },
                    }
                  );
                  let { results } = await data.json();
                  let castedResults = (results.bindings as any[]).map(
                    (single) => {
                      return {
                        value: single.itemLabel["value"] as string,
                        lang: single.itemLabel["xml:lang"] as string,
                      } as WikiResult;
                    }
                  );
                  castedResults.forEach((one) => {
                    console.log(one.lang, one.value);
                  });
                }}
              >
                Wiki Data
              </Button>
            </p>
          )}

          {site.stub_data && guardSoftwareCoStub(site.stub_data) && (
            <p>
              <br /> ***
              {site.stub_data && <b>{site.stub_data.area.title} </b>}
            </p>
          )}

          <Button
            onClick={(e) => {
              setSite(site);
            }}
          >
            Select
          </Button>
        </Card>
      ))}
    </div>
  );
}
