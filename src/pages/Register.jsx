import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=300&facet=libcog"
      )
      .then((result) => setCountries(result.data.records));
  }, []);

  const [name, setName] = useState("");

  const handleName = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const [email, setEmail] = useState("");

  const handleEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const [password, setPassword] = useState("");

  const handlePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const [username, setUsername] = useState("");

  const handleUsername = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const [country, setCountry] = useState("");

  const handleCountry = useCallback((event) => {
    setCountry(event.target.value);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      try {
        event.preventDefault();
        axios.post("https://jsonplaceholder.typicode.com/users", {
          name,
          email,
          username,
          password,
          country,
        }); // ici pas besoin de mettre "name : name, email: email...." JS permet ce raccourci
        props.setUser(name);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    [name, email, username, password, country, navigate, props]
  );

  return (
    <div className="container-register">
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="div-mb-3">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleName}
            ></input>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmail}
            ></input>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePassword}
            ></input>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsername}
            ></input>
            <label htmlFor="country" className="form-label">
              Pays
            </label>
            <select
              className="form-select"
              id="country"
              value={country}
              onChange={handleCountry}
            >
              {countries.map((country, index) => (
                <option key={index} value={country.fields.libcog}>
                  {country.fields.libcog}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="d-grid">
          <button className="btn btn-primary btn-expend">Valider</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
