import React, { useEffect, useState } from "react";
import { useCallback } from "react";

const roles = ["User", "Admin", "Jedi", "Padawan"];

function Roles(props) {
  const [criteria, setCriteria] = useState("");

  const handleChange = useCallback((event) => {
    setCriteria(event.target.value);
  }, []);

  const [rolesFiltered, setRolesFiltered] = useState([]); // Les rôles filtrés de base c'est un tableau vide

  useEffect(() => {
    setRolesFiltered(
      roles.filter((role) =>
        role.toLowerCase().includes(criteria.toLowerCase())
      )
    );
  }, [criteria]); // On va vouloir que ce calcul de RolesFiltered soit basé sur notre critère de recherche, aussi sur la liste des roles mais la liste des roles ne bouge pas elle est fixe alors ça bouge en fonction du critère de recherche critera.
  return (
    <div>
      <h1>Liste des rôles</h1>
      <input
        type="text"
        placeholder="Rechercher"
        value={criteria}
        onChange={handleChange}
      ></input>
      <br />
      {rolesFiltered.length
        ? rolesFiltered.map((role, index) => <li key={index}>{role}</li>)
        : "Aucun rôle à ce nom"}
    </div>
  );
}

export default Roles;
