import React from "react";
import TopNav from "./components/TestAnt";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Pages from "./pages/Pages";
import { ContextProvider } from "./Context";

function App() {
  return (
    <ContextProvider>
      <Router>
        <TopNav />
        <Route exact path="/" component={Home} />
        <Route exact path="/pages" component={Pages} />
      </Router>
    </ContextProvider>
  );
}

export default App;
