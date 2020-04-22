import React, { useEffect } from "react";
import AddSWSprovider from "../components/swcosp/AddSWSprovider";
import { ALL_SOFTWARE_SERVICE_PROVIDERS } from "../graphql/sw_co_sp";
import { useQuery } from "@apollo/react-hooks";
import AddSWSPCollStup from "../components/swcosp/AddSWSPCollStup";

export default function SoftwareCoSPs() {
  const { data } = useQuery(ALL_SOFTWARE_SERVICE_PROVIDERS, {
    context: { clientName: "neo4j" },
  });

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <div>
      <AddSWSprovider />
      <AddSWSPCollStup />
    </div>
  );
}
