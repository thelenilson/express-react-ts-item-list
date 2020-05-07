import React, {
  FunctionComponent,
  Fragment,
  ChangeEvent,
  ReactChildren,
} from "react";
import styled from "styled-components";

const StyledInput = styled.input``;

const Label = styled.label``;

const ErrorMessage = styled.div``;

interface InputError {
  message: string;
  type: string;
}

interface InputProps {
  children?: ReactChildren | string;
  type: string;
  error?: InputError;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<InputProps> = ({
  children,
  type,
  error,
  value,
  onChange,
}) => (
  <Fragment>
    <Label>{children}</Label>
    <StyledInput type={type} value={value} onChange={onChange} />
    {error ? <ErrorMessage>{error.message}</ErrorMessage> : null}
  </Fragment>
);

export default Input;
