import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_SITES } from "../graphql/sites";
import { Card } from "antd";

export default function Home() {
  const { data } = useQuery(ALL_SITES);

  return (
    <div>
      {data &&
        data.allSites &&
        data.allSites.data.map((site: any) => (
          <Card style={{ width: 300 }} title={site.name} key={site._id}>
            {JSON.stringify(site)}
          </Card>
        ))}
    </div>
  );
}
