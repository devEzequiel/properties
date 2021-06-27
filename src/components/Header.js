import React from "react";
import styles from "./Header.module.css";
import { Link, Redirect } from "react-router-dom";
import { ROUTES } from "../constants";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userLogout, user, logoutRedirect } = React.useContext(UserContext);
  // const [name, setName] = React.useState("");
  // (user && setName(user.data.name.split(' ')));
  async function handleLogout() {
    userLogout();
  }

  return (
    <header className={styles.Header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to={ROUTES.HOME}>
          Properties
        </Link>

        {/* se estiver logado aparece o botão de logout */}

        <div>
          <Link  className={`${styles.links} active`} to="/imoveis/criar">Adicionar Imóvel</Link>
          <Link  className={styles.links} to="/imoveis/salvos">Imóveis Salvos</Link>
          {user ? (
            <Link  className={styles.links} to={ROUTES.USER}>
              Ezequiel
              {/* <input
                type="button"
                value="sair"
                onClick={() => handleLogout()}
              /> */}
            </Link>
          ) : (
            <Link to={ROUTES.LOGIN} className={styles.login}>
              Login
            </Link>
          )}
        </div>
      </nav>
      {logoutRedirect && <Redirect to={ROUTES.LOGIN} />}
    </header>
  );
};

export default Header;
