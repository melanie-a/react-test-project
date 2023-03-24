import React, { useCallback, useContext } from "react";
import propTypes from "prop-types";
import axios from "axios";
import { Context } from "../context";

function UserProfile({ user, deleteUser, complete }) {
  const handleClick = useCallback(
    (event) => {
      // Toujours englober fonction dans useCallback pour optimiser les performances
      event.stopPropagation(); //Pour que, lorsqu'on appuie sur la petite poubelle pour supprimer l'utilisateur, ça bloque le fait qu'on soit redirigé vers la page du profil car ce n'est pas ce qu'on veut, ne pas oublier de le mettre dans la parenthèse du callback aussi
      axios.delete("https://jsonplaceholder.typicode.com/users/" + user.id);
      deleteUser(user.id);
    },
    [user, deleteUser]
  );

  const { context } = useContext(Context);

  return (
    <div>
      <div className={"card-profile card bg-" + context.theme}>
        <img
          src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <div className="card-text">
            <div>
              <b>Username :</b> {user.username}
            </div>
            {complete && (
              <div>
                <div>
                  <b>Adresse :</b> {user.address?.suite} {user.address?.street}{" "}
                  {/* Avec le point d'interrogation on gère les null, si pas d'adresse présente, on n'affiche pas les valeurs nulles*/}
                </div>
                <div>
                  <b>Ville :</b> {user.address?.city}
                </div>
                <div>
                  <b>Tel :</b> {user.phone}
                </div>
                <div>
                  <b>Site web :</b> {user.website}
                </div>
                <div>
                  <b>Company:</b> {user.company?.name}
                </div>
              </div>
            )}
          </div>
          {deleteUser && (
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger" onClick={handleClick}>
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          )}{" "}
          {/* Ici je dis 'ma condition c'est si j'ai deleteUser ou pas' "si sur une page j'ai la possibilité de supprimer l'utilisateur j'affiche le bouton, sinon je ne l'affiche pas*/}
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: propTypes.object.isRequired,
  deleteUser: propTypes.func,
  complete: propTypes.bool,
};

export default UserProfile;
