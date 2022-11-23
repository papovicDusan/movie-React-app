import { useDispatch } from "react-redux";
import { login } from "../store/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        dispatch(
          login({
            userData: values,
            onSuccess: () => {
              history.push("/movies");
            },
          })
        );
      }}
    >
      <Form>
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
