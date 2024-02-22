import { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FormCheckbox, FormField, Header, Message } from "semantic-ui-react";
import { Form, Input, SubmitButton } from 'formik-semantic-ui-react'
import { MyContext } from "../../contexts/auth";
import { Formik } from "formik";

interface FormValues {
  email: string,
  password: string
}

export default function SignIn() {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };
  const { handleSignIn, formLoading } = useContext(MyContext);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    setErrorMsg("");
    const response = await handleSignIn(values);
    console.warn(response);
    if (response.statusCode === 401) {
      setErrorMsg(response.message);
      resetForm();
    } else {
      setErrorMsg("Something went wrong! Please try again later");
    }
  }, [handleSignIn]);

  return (
    <div className="w-4/5 max-w-md text-gray-500">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form loading={formLoading}>
          <Header as='h1'>Sign In</Header>
          <p className="mb-6">Please sign in to your account and start the adventure</p>
          {errorMsg ? (
            <Message negative>
              <p>{errorMsg}</p>
            </Message>
          ) : ''}
          <Input type='email' name='email' required size="large" errorPrompt placeholder="Email" />
          <Input type='password' required name='password' size="large" errorPrompt placeholder="Password" />
          <FormField>
            <FormCheckbox label='Remember Me' />
          </FormField>
          <SubmitButton primary fluid loading={false}>SIGN IN</SubmitButton>
          <p className="mt-6 text-center">Don't have an account? <Link to={'/auth/sign-up'} className="text-primary font-bold cursor-pointer">Sign Up</Link></p>
        </Form>
      </Formik>
    </div >
  )
}
