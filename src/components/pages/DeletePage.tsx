import React from "react";
import { Button } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { ALL_PAGES, DELETE_PAGE } from "../../graphql/pages";
import { Popconfirm, message } from "antd";

export default function DeletePage({ page_id }: any) {
  let [deletePage] = useMutation(DELETE_PAGE, {
    refetchQueries: [
      {
        query: ALL_PAGES,
      },
    ],
  });

  function confirm() {
    message.success("تم الحذف");
    deletePage({ variables: { id: page_id } });
  }

  function cancel() {
    message.error("لم يتم الحذف");
  }

  return (
    <Popconfirm
      title="Are you sure delete this page ?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger> Delete</Button>
    </Popconfirm>
  );
}
