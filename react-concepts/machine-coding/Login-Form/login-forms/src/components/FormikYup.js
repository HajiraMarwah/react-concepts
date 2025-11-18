import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
function App() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name should be more than 3 characters')
      .required('Please enter Name'),
    email: Yup.string()
    .email("Enter valid email")
    .required('Please enter valid email'),
    gender: Yup.string().required('Please select gender'),
    country: Yup.string().required('Please select country'),
  });
  const initialValue = {
    name: '',
    email: '',
    gender: '',
    country: '',
  };
  const onSubmit = (values) => {
    console.log("valuess",values)
    // alert(JSON.stringify(values, null, 2));
  };
  return (
    <div>
      <h1>SignUp Form</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field name="name" type="text" />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: 'red' }}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="text" />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: 'red' }}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <div>
              <label>
                {' '}
                <Field name="gender" type="radio" value="male" />
                Male
              </label>

              <label>
                {' '}
                <Field name="gender" type="radio" value="female" />
                Female
              </label>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              style={{ color: 'red' }}
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <Field as="select" name="country">
              <option value="">Select country</option>
              <option value="india">India</option>
              <option value="uk">UK</option>
              <option value="usa">USA</option>
            </Field>
            <ErrorMessage
              name="country"
              component="div"
              style={{ color: 'red' }}
            />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
export default App;
