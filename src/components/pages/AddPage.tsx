import React from "react";
import { Form, Button, Input } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { ALL_PAGES, CREATE_PAGE } from "../../graphql/pages";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

export default function AddPage({ site_ref }: any) {
  const [createPage] = useMutation(CREATE_PAGE, {
    refetchQueries: [{ query: ALL_PAGES }],
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
    createPage({
      variables: { title: values.pagetitle, content: "", site_ref: site_ref },
    });
  };
  return (
    <Form {...layout} name="basic" onFinish={onFinish}>
      <Form.Item {...tailLayout}>
        <Form.Item
          label="Page Name"
          name="pagetitle"
          rules={[{ required: true, message: "Please input page name!" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
