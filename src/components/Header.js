import React from "react";
import styles from "./Header.module.css";
import { Link, Redirect } from "react-router-dom";
import { ROUTES } from "../constants";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userLogout, user, logoutRedirect, login } = React.useContext(UserContext);

  //recuperar o nome do usuário logado
  // React.useEffect(() => {
  //   (user && setName(user.data.name.split(' ')));
  // }, [])
  
  async function handleLogout() {
    userLogout();
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to={ROUTES.HOME}>
        <i class="fas fa-building" /> Imóveis
        </Link>

        {/* se estiver logado aparece o botão de logout */}

        {login ? (
          <div>
          <Link  className={`${styles.links} active`} to="/imoveis/criar">Adicionar Imóvel</Link>
            <Link  className={styles.links} to="/imoveis/salvos">Imóveis Salvos</Link>
          
              <i
                value="sair"
                onClick={() => handleLogout()}
                className={`${styles.iconStyle} fas fa-sign-out-alt`}
                title="Fazer Logout"
              />

          </div>
            ):(
            <div>
              <Link to={ROUTES.LOGIN} className={styles.login}>
                Login
              </Link>
            </div>
            )}
        
      </nav>
      {logoutRedirect && <Redirect to={ROUTES.LOGIN} />}
    </header>
  );
};

export default Header;
