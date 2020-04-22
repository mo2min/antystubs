import React from "react";
import TopNav from "./components/TopNav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Pages from "./pages/Pages";
import { ContextProvider } from "./Context";
import { Layout } from "antd";
import SoftwareCoSPs from "./pages/SoftwareCoSPs";
import MdEditor from "./pages/MdEditor";

function App() {
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <ContextProvider>
      <Router>
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>
              <TopNav />
            </Header>
            <Content>
              <Route exact path="/" component={Home} />
              <Route exact path="/pages" component={Pages} />
              <Route exact path="/edit_page/:page_id" component={MdEditor} />
              <Route exact path="/software_co_sps" component={SoftwareCoSPs} />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    </ContextProvider>
  );
}

export default App;
