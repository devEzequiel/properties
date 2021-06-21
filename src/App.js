import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import routes from "./Routes";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import { UserStorage } from "./UserContext";
import ProtectedRoutes from "./Helpers/ProtectedRoutes";
import User from "./components/User";

function App() {
  return (
    <div>
      <Router>
        <UserStorage>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/home" />
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
            <ProtectedRoutes path="/user" component={User} />
            
          </Switch>
          <Footer />
        </UserStorage>
      </Router>
    </div>
  );
}

export default App;
