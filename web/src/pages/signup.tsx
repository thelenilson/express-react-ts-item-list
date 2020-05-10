import React, { FunctionComponent, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { createAccount } from "../state/modules/auth/requests";

import Input from "../components/form/Input";
import Button from "../components/form/Button";

const SignUpBox = styled.div``;

const Form = styled.form`
  width: 85%;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

interface SingUpError {
  type: string;
  message: string;
}

interface SignUpProps {
  createAccount: (email: string, password: string) => void;
}

const mapDispatchToProps = (dispatch: any) => ({
  createAccount: (email: string, password: string) =>
    dispatch(createAccount(email, password)),
});

const RegisterUser = async (
  email: string,
  password: string,
  repeatPassword: string,
  createAccount: Function,
  setError: Function,
  setToHome: Function
) => {
  if (password !== repeatPassword) {
    return setError({
      type: "general",
      message: "Passwords doesn't match",
    });
  }
  try {
    await createAccount(email, password);
    setToHome(true);
  } catch (error) {
    setError({
      type: "general",
      message: error.response.data.error_description,
    });
  }
};

const SignUp: FunctionComponent<SignUpProps> = ({ createAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<SingUpError | undefined>(undefined);
  const [toHome, setToHome] = useState(false);

  return (
    <SignUpBox>
      {toHome ? <Redirect to="/" /> : null}
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          RegisterUser(
            email,
            password,
            repeatPassword,
            createAccount,
            setError,
            setToHome
          );
        }}
      >
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        >
          Email
        </Input>
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        >
          Password
        </Input>
        <Input
          type="password"
          value={repeatPassword}
          onChange={(event) => {
            setRepeatPassword(event.target.value);
          }}
        >
          Repeat password
        </Input>
        {error && error.type === "general" ? <div>{error.message}</div> : null}
        <Button type="submit">Sing Up</Button>
      </Form>
    </SignUpBox>
  );
};

export default connect(null, mapDispatchToProps)(SignUp);
