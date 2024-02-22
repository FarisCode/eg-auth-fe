import { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Message } from "semantic-ui-react";
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { MyContext } from "../../contexts/auth";
import { Formik } from "formik";
import * as Yup from 'yup';

interface FormValues {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export default function SignUp() {
  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be minimum 2')
      .max(100, 'Name must not be more than 100 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Za-z]).*$/, 'Password must contain at least one letter, one number, and one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const { handleSignUp, formLoading } = useContext(MyContext);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(async (values: FormValues, { setFieldValue }: { setFieldValue: (field: string, value: any) => void }) => {
    setErrorMsg("");
    const response = await handleSignUp(values);
    if (response?.statusCode === 409) {
      setErrorMsg(response.message);
      setFieldValue('password', '');
      setFieldValue('confirmPassword', '');
    } else {
      setErrorMsg("Something went wrong! Please try again later");
    }
  }, [handleSignUp]);

  return (
    <div className="w-4/5 max-w-md text-gray-500">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form loading={formLoading}>
          <Header as='h1'>Sign Up</Header>
          <p className="mb-6">Let's get started with your journey.</p>
          {errorMsg ? (
            <Message negative>
              <p>{errorMsg}</p>
            </Message>
          ) : ''}
          <Input name='name' required size="large" errorPrompt placeholder="Full name*" />
          <Input type='email' name='email' required size="large" errorPrompt placeholder="Email*" />
          <Input type='password' required name='password' size="large" errorPrompt placeholder="Password*" />
          <Input type='password' required name='confirmPassword' size="large" errorPrompt placeholder="Confirm password*" />
          {/* <FormField>
            <FormCheckbox label='I agree terms and conditions*' />
          </FormField> */}
          <SubmitButton primary fluid loading={false}>SIGN UP</SubmitButton>
          <p className="mt-6 text-center">Already have an account? <Link className="text-primary font-bold cursor-pointer" to={'/auth/sign-in'}>Sign In</Link></p>
        </Form>
      </Formik>
    </div >
  )
}
