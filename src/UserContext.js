import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET, USER_LOGOUT } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  //funcao para armazenar o erro de login
  const [loginError, setLoginError] = React.useState(null);
  const [loginRedirect, setLoginRedirect] = React.useState(false);
  const [logoutRedirect, setLogoutRedirect] = React.useState(false);

  const userLogout = React.useCallback(async function () {
    const token = window.localStorage.getItem("token");
    const { url, options } = USER_LOGOUT(token);
    await fetch(url, options);
    setUser(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    setLoginRedirect(false);
    setLogoutRedirect(true);
    window.localStorage.removeItem("token");
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setUser(json);
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      setLoginError(false);

      const { url, options } = TOKEN_POST({ email, password });
      const response = await fetch(url, options);

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const { token } = await response.json();
      window.localStorage.setItem("token", token);
      await getUser(token);

      setLoginRedirect(true);
    } catch (err) {
      setError(err.message);
      setLogin(false);
      setLoginError("Dados incorretos");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
        console.log("nao tem")
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        loginError,
        user,
        error,
        loading,
        login,
        loginRedirect,
        logoutRedirect,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
