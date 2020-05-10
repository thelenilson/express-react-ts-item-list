import React, {
  FunctionComponent,
  Fragment,
  ChangeEvent,
  ReactNode,
} from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 1.5rem;
  color: #202020;
  border: 1px solid #2fc2fc;
  text-align: center;
`;

const Label = styled.label``;

const ErrorMessage = styled.div``;

interface InputError {
  message: string;
  type: string;
}

interface InputProps {
  children?: ReactNode;
  type: string;
  error?: InputError;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: FunctionComponent<InputProps> = ({
  children,
  type,
  error,
  value,
  onChange,
  required,
}) => (
  <Fragment>
    <Label>{children}</Label>
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error ? <ErrorMessage>{error.message}</ErrorMessage> : null}
  </Fragment>
);

export default Input;
