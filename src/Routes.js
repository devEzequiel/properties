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
import { UserStorage } from "./UserContext";
import User from "./components/User";
import Home from "./components/Home";
import LoginForm from "./components/Login/LoginForm";
import LoginCriar from "./components/Login/LoginCriar";
import PrivateRoute from "./PrivateRoute";
import CreateProperty from "./components/Properties/CreateProperty";
import SavedProperties from "./components/Properties/SavedProperties";
import EditProperty from "./components/Properties/EditProperty";
import NotFound from "./components/NotFound";

const Routes = () => {
  return (
    <div>
      <Router>
        <UserStorage>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/login" component={LoginForm} />
            <Route path="/criar" component={LoginCriar} />
            <PrivateRoute path="/user" component={User} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/imoveis/criar" component={CreateProperty} />
            <PrivateRoute path="/imoveis/:id/editar" component={EditProperty}/>
            <PrivateRoute path="/imoveis/salvos" component={SavedProperties} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </UserStorage>
      </Router>
    </div>
  );
};

export default Routes;
