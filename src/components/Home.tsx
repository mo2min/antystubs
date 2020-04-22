import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_SITES } from "../graphql/sites";
import { Card, Button } from "antd";
import { Site, HistoricPlaceStub, SoftwareCoStub } from "../common/types";
import { AppContext } from "../Context";
import {
  guardHistoricPlaceStub,
  guardSoftwareCoStub,
} from "../common/typeguards";
import JsonPre from "./common/JsonPre";
import { getWikiClaims } from "../wiki/simplify";
import { ALL_STUBS } from "../graphql/sw_co_sp";

export default function Home() {
  const { data } = useQuery(ALL_SITES);
  const { setSite } = useContext(AppContext);
  const [renderSites, setRenderSites] = useState([] as Site[]);

  const { data: stubsData } = useQuery(ALL_STUBS, {
    context: { clientName: "neo4j" },
    fetchPolicy: "no-cache", // To Avoid heuristic fragment matching
  });

  useEffect(() => {
    /*
    const { createApolloFetch } = require("apollo-fetch");
    const fetch = createApolloFetch({uri: "http://localhost:4100/graphql"});
    */
    // TODO stubs first
    let sites: Site[] = [];
    if (data && data.allSites && stubsData && stubsData.Stub) {
      console.log(stubsData);
      // Fetch stub data from knol graph
      data.allSites.data.map(async (site: Site) => {
        // site.knol_data = { test: "Test" };

        if (site.stub_knol_id) {
          console.log(site.stub_knol_id);
          let [stub] = stubsData.Stub.filter(
            (item: any) => item.id === site.stub_knol_id
          );
          if (stub) {
            switch (stub.__typename) {
              case "HistoricPlaceStub":
                site.stub_data = stub as HistoricPlaceStub;
                break;
              case "SoftwareCoStub":
                site.stub_data = stub as SoftwareCoStub;
                break;
              default:
                break;
            }
          }
          /*
          let knol_data = await fetch({
            query: `
              query getStup($id: ID!) {}`,
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
          */
        }
        console.log(site);
        sites.push(site);
        setRenderSites([...sites]);
      });
    }
  }, [data, stubsData]);

  return (
    <div>
      {renderSites.map((site: Site) => (
        <Card style={{ direction: "rtl" }} title={site.name} key={site._id}>
          <JsonPre data={site} />
          {site.stub_data &&
            guardHistoricPlaceStub(site.stub_data) &&
            site.stub_data.historic_place && (
              <p>
                <b>{site.stub_data.historic_place.title} </b>
                <br /> منطقة :
                {site.stub_data.historic_place.curr_area && (
                  <b>{site.stub_data.historic_place.curr_area.title}</b>
                )}
                <br />
                <b>WikiID: </b> {site.stub_data.historic_place.wiki_id}
                <Button
                  onClick={async () => {
                    const wiki_id = guardHistoricPlaceStub(site.stub_data)
                      ? site.stub_data.historic_place.wiki_id
                      : "";
                    getWikiClaims(wiki_id);
                    /*
                  castedResults.forEach((one: WikiResult) => {
                    console.log(one.lang, one.value);
                  });
                  */
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
              <Button
                onClick={async () => {
                  const wiki_id = guardSoftwareCoStub(site.stub_data)
                    ? site.stub_data.softwareCompany.wiki_id
                    : "";
                  getWikiClaims(wiki_id);
                }}
              >
                * Wiki Data *
              </Button>
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
