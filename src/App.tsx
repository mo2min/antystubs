import React from "react";
import TestAnt from "./components/TestAnt";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <TestAnt />
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
