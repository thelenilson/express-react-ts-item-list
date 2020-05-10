import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import PrivateRoute from "./components/private";

import createStore from "./state/store";

const store = createStore;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
