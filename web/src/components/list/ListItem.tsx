import React, { FunctionComponent, ReactChildren } from "react";
import styled from "styled-components";

const StyledListItem = styled.li``;

interface ListItemProps {
  children?: ReactChildren | string;
}

const ListItem: FunctionComponent<ListItemProps> = ({ children }) => (
  <StyledListItem>{children}</StyledListItem>
);

export default ListItem;
