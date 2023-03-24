import React, { useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

function Create({ onUserAdded }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);

  const navigate = useNavigate(); // useNavigate est un hook permettant redirection

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      username: usernameRef.current.value,
    };
    navigate("/"); // on appelle navigate après la création de notre utilisateur

    onUserAdded(newUser);

    // Clear input fields
    nameRef.current.value = "";
    emailRef.current.value = "";
    usernameRef.current.value = "";
  };

  const { context } = useContext(Context);

  return (
    <div className="container-solo">
      <div className={"card-solo col-md-6 card bg-" + context.theme}>
        <div className="card-body">
          <h5 className="card-title">Nouveau jedi</h5>
          <p className="card-text">From padawan to jedi</p>
          <nav className="navbar navbar-light bg-light">
            <form className="container-fluid" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Prénom"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  ref={nameRef}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  ref={emailRef}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  ref={usernameRef}
                />
              </div>
              <br />
              <button className="btn btn-info" type="submit">
                Ajouter à la liste
              </button>
            </form>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Create;
