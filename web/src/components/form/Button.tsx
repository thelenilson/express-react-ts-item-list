import React, { ReactChildren, FunctionComponent, MouseEvent } from "react";
import styled from "styled-components";

const StyledButton = styled.button``;

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactChildren | string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  children,
  type,
}) => (
  <StyledButton onClick={onClick} type={type}>
    {children}
  </StyledButton>
);

export default Button;
