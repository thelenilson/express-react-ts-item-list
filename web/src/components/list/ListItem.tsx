import React, { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

const StyledListItem = styled.li`
  display: flex;
  width: 100%;
  height: 50px;
  margin: 5px 0;
  padding: 0 3%;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #202020;
`;

interface ListItemProps {
  children?: ReactNode;
}

const ListItem: FunctionComponent<ListItemProps> = ({ children }) => (
  <StyledListItem>{children}</StyledListItem>
);

export default ListItem;
