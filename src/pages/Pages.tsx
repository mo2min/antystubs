import React, { useContext } from "react";
import { ALL_PAGES } from "../graphql/pages";
import { useQuery } from "@apollo/react-hooks";
import { Card } from "antd";
import { AppContext } from "../Context";
import AddPage from "../components/AddPage";
import DeletePage from "../components/pages/DeletePage";

export default function Pages() {
  const { data } = useQuery(ALL_PAGES);
  const { site } = useContext(AppContext);
  return (
    <div>
      {data &&
        data.allPages &&
        data.allPages.data.map((page: any) => (
          <div key={page._id}>
            {page.site._id === site._id && (
              <Card style={{ width: 300 }} title={page.title}>
                <pre>{JSON.stringify(page)}</pre>
                <DeletePage page_id={page._id} />
              </Card>
            )}
          </div>
        ))}
      <AddPage site_ref={site._id} />
    </div>
  );
}
