import React, { useContext } from "react";
import { ALL_PAGES } from "../graphql/pages";
import { useQuery } from "@apollo/react-hooks";
import { Card, Space } from "antd";
import { AppContext } from "../Context";
import AddPage from "../components/pages/AddPage";
import DeletePage from "../components/pages/DeletePage";
import JsonPre from "../components/common/JsonPre";
import EditPage from "../components/pages/EditPage";

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
              <Card title={page.title}>
                <JsonPre data={page} />
                <Space>
                  <DeletePage page_id={page._id} />
                  <EditPage page_id={page._id} />
                </Space>
              </Card>
            )}
          </div>
        ))}
      <AddPage site_ref={site._id} />
    </div>
  );
}
