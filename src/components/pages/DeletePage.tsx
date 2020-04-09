import React from "react";
import { Button } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { ALL_PAGES, DELETE_PAGE } from "../../graphql/pages";

export default function DeletePage({ page_id }: any) {
  let [deletePage] = useMutation(DELETE_PAGE, {
    refetchQueries: [
      {
        query: ALL_PAGES,
      },
    ],
  });

  return (
    <Button
      onClick={(e) => {
        deletePage({ variables: { id: page_id } });
      }}
    >
      {" "}
      Delete {page_id}
    </Button>
  );
}
