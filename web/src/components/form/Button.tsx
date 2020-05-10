import React, { FunctionComponent, MouseEvent, ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  min-width: 120px;
  height: 50px;
  background-color: #2fc2fc;
  border: none;
  text-align: center;
  color: #ffffff;
`;

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactNode;
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
