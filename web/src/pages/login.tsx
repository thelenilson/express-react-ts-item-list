import React, { useState, FunctionComponent } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";

import Input from "../components/form/Input";
import CheckBox from "../components/form/Checkbox";
import Button from "../components/form/Button";

import { login } from "../state/modules/auth/requests";

const LoginBox = styled.div``;

const Form = styled.form`
  width: 85%;
  height: 300px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const CheckBoxWrapper = styled.div`
  width: 100%;
`;

interface LoginProps {
  login: (username: string, password: string) => void;
}

interface LoginError {
  type: string;
  message: string;
}

const mapDispatchToProps = (dispatch: any) => ({
  login: (email: string, password: string) => dispatch(login(email, password)),
});

const AuthenticateUser = async (
  email: string,
  password: string,
  login: Function,
  setError: Function,
  setToHome: Function
) => {
  setError(undefined);
  try {
    await login(email, password);
    setToHome(true);
  } catch (error) {
    setError({
      type: "general",
      message: error.response.data.error_description,
    });
  }
};

const Login: FunctionComponent<LoginProps> = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<LoginError | undefined>(undefined);
  const [toHome, setToHome] = useState(false);
  const [cookies] = useCookies(["auth_info"]);

  return (
    <LoginBox>
      {toHome || cookies["auth_info"] ? <Redirect to="/" /> : null}
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          AuthenticateUser(email, password, login, setError, setToHome);
        }}
      >
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
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
        {error && error.type === "general" ? <div>{error.message}</div> : null}
        <Button type="submit">Login</Button>
        <p>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </Form>
    </LoginBox>
  );
};

export default connect(null, mapDispatchToProps)(Login);
