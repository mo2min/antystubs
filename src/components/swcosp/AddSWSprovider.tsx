import React from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_SOFTWARE_SERVICE_PROVIDER,
  ALL_SOFTWARE_SERVICE_PROVIDERS,
} from "../../graphql/sw_co_sp";
import { Form, Button, Input } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

export default function AddSWSprovider() {
  const [createSoftwareServiceProvider] = useMutation(
    CREATE_SOFTWARE_SERVICE_PROVIDER,
    {
      refetchQueries: [
        {
          query: ALL_SOFTWARE_SERVICE_PROVIDERS,
          context: { clientName: "neo4j" },
        },
      ],
      context: { clientName: "neo4j" },
    }
  );

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // TODO handle multible apollo clients with adding error if query not for this client
    createSoftwareServiceProvider({
      variables: { title: values.title, website: "" },
    });
  };
  return (
    <Form {...layout} name="basic" onFinish={onFinish}>
      <Form.Item {...tailLayout}>
        <Form.Item
          label="Sofware SP Name"
          name="title"
          rules={[{ required: true, message: "Please input Sofware SP name!" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
