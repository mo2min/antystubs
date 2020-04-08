import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";

function TestAnt() {
  const [size, setSize] = useState(8);

  useEffect(() => {
    // Update the document title using the browser API
    setSize(24);
  }, [setSize]);

  return (
    <>
      <Space size={size}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </>
  );
}

export default TestAnt;
