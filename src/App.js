import React from "react";
import Nav from "./Components/Nav";
import Home from "./Pages/Home.jsx";
import Make from "./Pages/Make.jsx";
import Model from "./Pages/Model.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Make" component={Make} />
          <Route path="/Model" component={Model} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
