import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  width: 50%;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

interface ListProps {
  children?: ReactNode;
}

const List: FunctionComponent<ListProps> = ({ children }) => (
  <StyledList>{children}</StyledList>
);

export default List;
