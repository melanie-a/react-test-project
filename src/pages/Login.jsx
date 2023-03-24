import React, { useCallback, useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Context } from "../context";

const fakeAxios = {
  post: (url, data) => {
    if (url === "/api/login") {
      if (data.username === "Paul" && data.password === "password") {
        return Promise.resolve({
          status: 200,
          data: { token: "xxx.yyy.zzz" },
        });
      } else {
        return Promise.reject({ status: 401 });
      }
    } else {
      return axios.post(url, data);
    }
  },
};

function Login(props) {
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(Context);
  const handleLogin = useCallback(() => {
    dispatch({ type: "login" });
  }, [dispatch]);

  return (
    <div className="container-register">
      {/* Se connecter avec Formik */}
      <h1>Se connecter pour partir en mission</h1>
      {authError && <div className="alert alert-danger">{authError}</div>}
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Un nom d'utilisateur est nécessaire")
            .min(
              2,
              "Votre nom d'utilisateur doit contenir au moins 2 caractères"
            ),
          password: Yup.string()
            .required("Un mot de passe est requis")
            .min(8, "Votre mot de passe doit contenir au minimum 8 caractères"),
        })}
        onSubmit={async ({ username, password }) => {
          // A chaque fois qu'on fait un call api mieux vaut faire un try catch
          try {
            const response = await fakeAxios.post("/api/login", {
              username,
              password,
            });
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer: ${response.data.token}`;
            props.setUser(username);
            navigate("/");
          } catch (error) {
            if (error.status === 401) {
              setAuthError("Login ou mot de passe incorrect");
            } else {
              setAuthError(error.message);
            }
            console.error(error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="div-mb-3">
                <label htmlFor="username" className="form-label">
                  Nom d'utilisateur
                </label>
                <Field className="form-control" id="username" name="username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-warning"
                />

                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-warning"
                />
              </div>
            </div>
            <br />
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-expend"
                disabled={isSubmitting}
                onClick={handleLogin}
              >
                Valider
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
