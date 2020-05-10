import React, { FunctionComponent, useState, Fragment } from "react";
import Button from "../form/Button";
import { Item } from "../../state/modules/item/types";
import styled from "styled-components";

const DropDownContainer = styled.div`
  position: relative;
`;

const DropDownBox = styled.div`
  width: 200px;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  position: absolute;
  right: 0;
  top: 20px;
  border: 1px solid #202020;
  background-color: #ffffff;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
`;

const DropdownOption = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid #202020;
  background: none;

  &:last-child {
    border-bottom: none;
  }
`;

interface DropdownProps {
  item: Item;
  setSelectedItem: Function;
  setShowModal: Function;
  removeItem: Function;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  item,
  setSelectedItem,
  setShowModal,
  removeItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>&darr;</DropdownButton>
      {isOpen ? (
        <DropDownBox>
          <DropdownOption
            onClick={() => {
              setSelectedItem(item);
              setShowModal(true);
              setIsOpen(false);
            }}
          >
            Update
          </DropdownOption>
          <DropdownOption
            onClick={() => {
              removeItem(item.id);
              setIsOpen(false);
            }}
          >
            Delete
          </DropdownOption>
        </DropDownBox>
      ) : null}
    </DropDownContainer>
  );
};

export default Dropdown;
