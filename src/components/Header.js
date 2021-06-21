import React from "react";
import styles from "./Header.module.css";
import { Link, Redirect } from "react-router-dom";
import { ROUTES } from "../constants";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userLogout, user, logoutRedirect } = React.useContext(UserContext);
  // console.log(user);
  // {data && console.log(data.profile)}
  async function handleLogout() {
    userLogout();
  }

  return (
    <header className={styles.Header}>
      <nav className={`${styles.nav} container`}>

        <Link className={styles.logo} to={ROUTES.HOME}>
          Home
        </Link>

        {/* se estiver logado aparece o botão de logout */}

        {user ? (

          <Link to={ROUTES.USER} className={styles.login}>
            {user && user.data.name}<button onClick={() => handleLogout()}>sair</button>
          </Link>

        ) : (
          <Link to={ROUTES.LOGIN} className={styles.login}>
            Login
          </Link>
        )}
      </nav>
      {logoutRedirect && <Redirect to={ROUTES.LOGIN} />}
    </header>
  );
};

export default Header;
