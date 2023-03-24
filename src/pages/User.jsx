import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";

function User(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/" + id)
      .then((result) => setUser(result.data));
  }, [id]); // On utilise id qui vient d'un hook (useParams) donc c'est une dépendance on l'ajoute ici

  return (
    <div className="container">
      <h1>Profil utilisateur</h1>
      <br />
      <div style={{ width: 800 }}>
        {user.id ? (
          <UserProfile user={user} complete />
        ) : (
          /* Si user est là très bien on affiche l'userProfile, sinon spinner  */
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
