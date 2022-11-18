import { useDispatch } from "react-redux";
import { register } from "../store/auth";
import { useHistory } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        dispatch(
          register({
            userData: values,
            onSuccess: () => {
              history.push("/login");
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

        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
