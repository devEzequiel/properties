import React from "react";
import { UserContext } from "../UserContext";
import { Route, Redirect } from "react-router";

//verifica se o login foi feito e protege as rotas autenticáveis
const ProtectedRoutes = (props) => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Route {...props} />;
  else if (login === false) return <Redirect to="/login" />;
  else return null;
};

export default ProtectedRoutes;
