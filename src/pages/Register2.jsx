import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register(props) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=300&facet=libcog"
      )
      .then((result) => setCountries(result.data.records));
  }, []);

  const navigate = useNavigate();

  return (
    //Inscription avec Formik
    <div className="container-register">
      <h1>Rejoindre la guerre des étoiles</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          username: "",
          password: "",
          country: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Un nom est nécessaire")
            .min(2, "Votre nom doit comporter au moins deux caractères")
            .max(50, "Votre nom doit comporter moins de 50 caractères"),
          email: Yup.string()
            .email("Entrez un email valide")
            .required("Un email est nécessaire"),
          username: Yup.string().required(
            "Un nom d'utilisateur est nécessaire"
          ),
          password: Yup.string()
            .required("Un mot de passe est requis")
            .min(8, "Votre mot de passe doit contenir au minimum 8 caractères"),
          country: Yup.string().required("Veuillez indiquer un pays"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { name, email, username, password, country } = values;
            await axios.post("https://jsonplaceholder.typicode.com/users", {
              name,
              email,
              username,
              password,
              country,
            });
            setSubmitting(false);
            navigate("/");
            props.setUser(name);
          } catch (error) {
            console.error(error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div className="div-mb-3">
                <label htmlFor="name" className="form-label">
                  Nom
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="alert alert-warning"
                />
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field className="form-control" id="email" name="email" />
                <ErrorMessage
                  name="email"
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

                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-warning"
                />

                <label htmlFor="country" className="form-label">
                  Pays
                </label>
                <Field
                  component="select"
                  className="form-select"
                  id="country"
                  name="country"
                >
                  <option value=""></option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.fields.libcog}>
                      {country.fields.libcog}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="alert alert-warning"
                />
              </div>
            </div>
            <br />
            <div className="d-grid">
              <button
                className="btn btn-primary btn-expend"
                disabled={isSubmitting}
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

export default Register;
