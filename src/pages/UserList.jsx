import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { Context } from "../context";

function UserList({ users, deleteUser }) {
  const [criteria, setCriteria] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = useCallback((event) => {
    setCriteria(event.target.value);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(criteria.toLowerCase()) ||
          user.username.toLowerCase().includes(criteria.toLowerCase()) ||
          user.email.toLowerCase().includes(criteria.toLowerCase())
      )
    );
  }, [criteria, users]);

  const { context } = useContext(Context);

  const navigate = useNavigate();
  return (
    <div className="col col-md-12 col-lg-12 col-sm-4">
      <div className="container">
        <Link
          to="/create"
          className="d-grid gap-2 d-md-flex justify-content-md-end"
        >
          <button type="button" className="btn btn-info">
            Recruter un jedi
          </button>
        </Link>
        <div>
          <h1>Liste des jedis</h1>
          <input
            className="form-control me-2"
            type="text"
            placeholder="Rechercher un jedi"
            aria-label="Search"
            onChange={handleSearch}
          />
          <br />
          <table className={"table table-" + context.theme}>
            <thead className={"table table-" + context.theme}>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>@{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div>
          <div className="wrapper">
            {filteredUsers.length ? (
              filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className=""
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/users/" + user.id)}
                >
                  <UserProfile
                    user={user}
                    deleteUser={() => deleteUser(user.id)}
                  />
                </div>
              ))
            ) : (
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;

// key={index} s'applique sur l'enfant imméditat, donc si c'est une div qui suit, on l'applique à la div
