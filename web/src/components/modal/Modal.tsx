import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item } from "../../state/modules/item/types";
import { createItem, updateItem } from "../../state/modules/item/requests";

import Input from "../form/Input";
import Button from "../form/Button";

const StyledModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #20202080;
`;

const ModalContainer = styled.div`
  width: 450px;
  background-color: #fff;
  text-align: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 85%;
  margin: 0 auto;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  height: 50px;
`;

const Form = styled.form`
  width: 85%;
  height: 140px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const mapDispatchToProps = (dispatch: any) => ({
  createItem: (name: string) => dispatch(createItem(name)),
  updateItem: (id: number, name: string) => dispatch(updateItem(id, name)),
});

interface ModalProps {
  item?: Item;
  onClose: () => void;
  updateItem: (id: number, name: string) => void;
  createItem: (name: string) => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  item,
  onClose,
  updateItem,
  createItem,
}) => {
  const [name, setName] = useState("");
  return (
    <StyledModal>
      <ModalContainer>
        <ModalHeader>
          <h1>{item && item.id ? "Update" : "Add"} Item</h1>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            item && item.id ? updateItem(item.id, name) : createItem(name);
            onClose();
          }}
        >
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Input>
          <Button type="submit">{item && item.id ? "Update" : "Add"}</Button>
        </Form>
      </ModalContainer>
    </StyledModal>
  );
};

export default connect(null, mapDispatchToProps)(Modal);
