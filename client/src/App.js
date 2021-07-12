import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Landing } from "./components/Landing";
import { Cart } from "./components/Cart";
import { Items } from "./components/Items";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <NavBar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <section className="container">
            <Route exact path="/item" component={Items} />
            <Route exact path="/cart" component={Cart} />
          </section>
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
