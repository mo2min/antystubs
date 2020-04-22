import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";
import { NavLink } from "react-router-dom";

function TopNav() {
  const [size, setSize] = useState(8);

  useEffect(() => {
    // Update the document title using the browser API
    setSize(24);
  }, [setSize]);

  return (
    <>
      <Space size={size}>
        <NavLink className="nav-link" to="/" exact activeClassName="activeNav">
          <Button>Sites</Button>
        </NavLink>

        <NavLink className="nav-link" to="/pages" activeClassName="activeNav">
          <Button>Pages</Button>
        </NavLink>

        <NavLink
          className="nav-link"
          to="/software_co_sps"
          activeClassName="activeNav"
        >
          <Button>Software Co & SPs</Button>
        </NavLink>

        <NavLink
          className="nav-link"
          activeStyle={{
            background: "red",
            color: "white",
          }}
          to="/dashed"
        >
          <Button type="dashed">Dashed</Button>
        </NavLink>

        <Button type="link">Link</Button>
      </Space>
    </>
  );
}

export default TopNav;
