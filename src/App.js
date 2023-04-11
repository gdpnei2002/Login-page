import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"

function App() {
  const handleClickLogin = (values) => console.log(values)

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
    </div>
  );
}

export default App;
