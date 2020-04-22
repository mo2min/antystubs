import React from "react";
import { Button } from "antd";

export default function EditPage({ page_id }: any) {
  return <Button href={`/edit_page/${page_id}`}> Edit </Button>;
}
