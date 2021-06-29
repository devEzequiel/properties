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
import PublicRoute from "./PublicRoute";

const Routes = () => {

  return (
    <div>
      <Router>
        {/* user storage armazena os dados do usuário, caso logado */}
        <UserStorage>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <PublicRoute path="/login" component={LoginForm} />
            <PublicRoute path="/criar" component={LoginCriar} />

            {/* rotas que só podem ser acessadas pós autenticação */}
            <PrivateRoute path="/user" component={User} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/imoveis/criar" component={CreateProperty} />
            <PrivateRoute path="/imoveis/:id/editar" component={EditProperty}/>
            <PrivateRoute path="/imoveis/salvos" component={SavedProperties} />
            {/* <PrivateRoute path="/logout" component={Logout} /> */}

      
            <Route path="*" component={NotFound} />
            <PrivateRoute path="imoveis/*" component={NotFound} />
          </Switch>
          <Footer />
        </UserStorage>
      </Router>
    </div>
  );
};

export default Routes;
