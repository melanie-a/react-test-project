// import logo from './logo.svg';
import Headerr from "./components/Headerr";
import "./App.css";
import Counter from "./pages/Counter";
import Create from "./pages/Create";
import UserList from "./pages/UserList";
import History from "./pages/History";
import Roles from "./pages/Roles";
import Login from "./pages/Login";
import React, { useCallback, useState, useEffect, useContext } from "react"; // Ce sont des hooks
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register2";
import Page404 from "./pages/Page404";
import Post from "./pages/Post";
import User from "./pages/User";
import classnames from "classnames";
import { Context } from "./context";

function App() {
  useEffect(() => {
    // Version fetch
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((result) => setUsers(result));
    // Version Axios
    axios
      .get("https://jsonplaceholder.typicode.com/users") // axios fait la transformation en json tout seul, pas besoin de le faire
      .then((result) => setUsers(result.data)); // axios simplifie les login et requetes http
  }, []);
  const [users, setUsers] = useState([]);

  // const setSearchTerm = useState(""); plus utilisée dans handleUserAdded

  const handleUserAdded = useCallback(
    (newUser) => {
      setUsers([...users, newUser]);
      // setSearchTerm(""); + ci-dessous dans le tableau
    },
    [users]
  );

  // Set USER
  const [user, setUser] = useState(""); //

  const deleteUser = useCallback(
    (userId) => {
      // fonction qui va filtrer et renvoyer un nouveau tableau sans l'utilisateur supprimé, car comme on ne peut pas supprimer réellement les données depuis l'API (pour que tout le monde ait toujours cette donnée), on va faire en sorte que cela se répercute sur le front.
      setUsers(users.filter((user) => user.id !== userId)); // Si c'est l'id qu'on cherche on le garde pas, si c'est pas l'id qu'on veut on le garde
    },
    [users]
  );

  // const setUserThomas = useCallback(() => {
  //   setUser("Palpatine");
  // }, []);
  // const setUserMelanie = useCallback(() => {
  //   setUser("Dark Vador");
  // }, []);

  // Set COUNTER

  const [counter, setCounter] = useState(0);
  // const a = 3;
  // const b = a % 2; // Si c'est égal à 1 c'est impair, si c'est égal à 0, c'est pair
  // const tab = [2, 3, 4];
  // const newTab = [...tab, 9]; // C'est à dire tous les éléments de tab mais ce sera un nouveau tableau, utile quand on veut rajouter une valeur (ici 9)
  const [history, setHistory] = useState([]); // valeur réactive, car valeur change

  const histoCounter = useCallback(
    (newCount) => {
      setHistory([...history, counter]);
      setCounter(newCount);
    },
    [counter, history]
  );

  const { context } = useContext(Context);

  return (
    <div
      className={classnames("min-vh-100 bg-" + context.theme, {
        "text-light": context.theme === "dark",
      })}
    >
      <Headerr user={user} setUser={setUser} />
      <div className="row">
        <Routes>
          <Route
            path="/counter"
            element={<Counter counter={counter} histoCounter={histoCounter} />}
          />
          <Route
            path="/create"
            element={<Create onUserAdded={handleUserAdded} />}
          />
          <Route path="/history" element={<History history={history} />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/"
            element={<UserList users={users} deleteUser={deleteUser} />}
          />
          <Route path="/users/:id" element={<User />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// Un composant se présente toujours de cette manière :
// D'abord importer le CSS et les autres fichiers dont on a besoin pour créer notre composant en début de fichier, puis contient une fonction qui décrit le comportement du composant
// Puis export ce même composant pour qu'il soit réutilisé ailleurs
// Dans React, les codes JS et HTML peuvent être écrit au même endroit dans des fichiers .jsx.
// -> changer App.js en App.jsx
// Les props permettent de faire transiter des données d'un composant parent (ici App) à un composant enfant (Header, History, Counter)
// # Les props événement permettent de passer des infos d'un composant enfant à un composant parent
// Ne pas oublier d'importer Routes en debut de fichier. On englobe toutes nos pages avec Routes.
