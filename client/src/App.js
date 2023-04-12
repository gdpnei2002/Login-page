import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import Axios from "axios"

function App() {

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });

  return (
    <div className="container">
        <h1>Login</h1>
        <Formik 
          initialValues={{}}
          onSubmit={handleClickLogin}
          validationSchema={validationsLogin}>
          <Form className="login-form">
            <div className="login-form-froup">
              <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>
            <div className="login-form-froup">
              <Field name="password" className="form-field" placeholder="senha" />
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>
            <button className="button" type="submit">Login</button>
          </Form>
        </Formik>
        <h1>Register</h1>
        <Formik 
          initialValues={{}}
          onSubmit={handleClickRegister}
          validationSchema={validationsRegister}>
          <Form className="login-form">
            <div className="login-form-froup">
              <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>
            <div className="login-form-froup">
              <Field name="password" className="form-field" placeholder="senha" />
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>

            <div className="login-form-froup">
              <Field name="confirmation" className="form-field" placeholder="confirme sua senha" />
              <ErrorMessage
                component="span"
                name="confirmation"
                className="form-error"
              />
            </div>
            
            <button className="button" type="submit">Cadastrar</button>
          </Form>
        </Formik>
    </div>
  );
}

export default App;
