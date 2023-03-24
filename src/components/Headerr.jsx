import logo from "../logo.svg";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCallback, useContext } from "react";
import { Context } from "../context";
import classnames from "classnames";

function Headerr({ setUser, user }) {
  const { context, dispatch } = useContext(Context);
  const switchTheme = useCallback(() => {
    dispatch({ type: "switchTheme" }); // Le type c'est le "case" de context.jsx
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch({ type: "logout" });
  }, [dispatch]);

  const handleLogin = useCallback(() => {
    if (!context.isLoggedIn) {
      dispatch({ type: "login" });
      setUser(null); // mettre à jour l'état de l'utilisateur
    }
  }, [dispatch, context.isLoggedIn, setUser]);

  const login =
    context.isLoggedIn && user ? (
      <span>Bienvenue {user} !</span>
    ) : (
      <div>
        <Link to="/login" onClick={handleLogin}>
          Se connecter
        </Link>
        &nbsp; ou &nbsp;
        <Link to="/register">S'inscrire</Link>
      </div>
    ); // if en ternaire
  return (
    <div>
      <nav
        className={classnames(
          "navbar navbar-expend-md",
          context.theme === "light"
            ? "navbar-dark bg-dark text-white"
            : "navbar-dark bg-secondary text-dark"
        )}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              width="30"
              className="d-inline-block align-text-center"
              alt=""
            />
            NABU
          </Link>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={switchTheme}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {context.theme}
            </label>
          </div>
          <div className="navbar-text">{login}</div>
          <button
            className="navbar-toggler btn-info"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/create"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Recruter des Jedis
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/counter"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Envoyer des vaisseaux
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/history"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Historique d'envoi des vaisseaux
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/roles"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Rôles
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  S'inscrire
                </Link>
              </li>
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Connexion rapide...
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <div className="dropdown-item" href="#">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setUser("Thomas")}
                      >
                        Se connecter en tant que Palpatine
                      </button>
                    </div>
                    <div className="dropdown-item" href="#">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setUser("Melanie")}
                      >
                        Se connecter en tant que Dark Vador
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <button
              className={"btn btn-outline-" + context.theme}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

Headerr.propTypes = {
  // Ajoute une détection supplémentaire pour détecter les erreurs/bugs
  user: propTypes.string, // Si un user indique un prénom de type Integer "42", il y aura une erreur dans la console
  setUser: propTypes.func.isRequired, // Permet d'exporter un objet de type FONCTION, isRequired permet de mettre un message dans la console indiquant que la fonction est obligatoire
};
export default Headerr;
