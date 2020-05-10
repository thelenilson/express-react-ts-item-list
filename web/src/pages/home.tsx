import React, { FunctionComponent, useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../state/modules/auth/requests";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import {
  getItemList,
  removeItem,
  removeMultipleItems,
} from "../state/modules/item/requests";
import { ItemState, Item } from "../state/modules/item/types";

import Modal from "../components/modal/Modal";
import List from "../components/list/List";
import ListItem from "../components/list/ListItem";
import Dropdown from "../components/dropdown/Dropdown";
import CheckBox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import {
  selectItem,
  unselectItem,
  selectAll,
} from "../state/modules/item/actions";

const mapStateToProps = (state: any) => ({
  items: state.items,
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout()),
  getItemList: () => dispatch(getItemList()),
  selectAll: () => dispatch(selectAll()),
  selectItem: (id: number) => dispatch(selectItem(id)),
  unselectItem: (id: number) => dispatch(unselectItem(id)),
  removeItem: (id: number) => dispatch(removeItem(id)),
  removeMultipleItems: () => dispatch(removeMultipleItems()),
});

interface HomeProps extends RouteComponentProps {
  logout: () => void;
  getItemList: () => void;
  selectAll: () => void;
  selectItem: (id: number) => void;
  unselectItem: (id: number) => void;
  removeItem: (id: number) => void;
  removeMultipleItems: () => void;
  items: ItemState;
}

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin: 0 auto;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  height: 50px;
`;

const Footer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin: 0 auto;
`;

const Home: FunctionComponent<HomeProps> = ({
  logout,
  history,
  getItemList,
  items,
  selectAll,
  selectItem,
  unselectItem,
  removeItem,
  removeMultipleItems,
}) => {
  useEffect(() => {
    getItemList();
  }, [getItemList]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  return (
    <Fragment>
      <Header>
        <h1>Items list</h1>
        <LogoutButton
          onClick={() => {
            logout();
            history.push({ pathname: "/" });
          }}
        >
          logout
        </LogoutButton>
      </Header>
      <List>
        <CheckBox
          checked={items.items.length === items.selectedItems.length}
          onChange={() => selectAll()}
        >
          Select all
        </CheckBox>
        {items.items?.map((item, index) => (
          <ListItem key={index}>
            <Fragment>
              <CheckBox
                checked={items.selectedItems.includes(item.id)}
                onChange={(event) => {
                  event.target.checked
                    ? selectItem(item.id)
                    : unselectItem(item.id);
                }}
              />
              {item.name}
              <Dropdown
                item={item}
                setSelectedItem={setSelectedItem}
                setShowModal={setShowModal}
                removeItem={removeItem}
              ></Dropdown>
            </Fragment>
          </ListItem>
        ))}
      </List>
      <Footer>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add new item
        </Button>
        <Button
          onClick={() => {
            if (items.selectedItems.length <= 0) {
              alert("No items selected");
            }
            removeMultipleItems();
          }}
        >
          Remove selected items
        </Button>
      </Footer>

      {showModal ? (
        <Modal
          item={selectedItem}
          onClose={() => {
            setSelectedItem(undefined);
            setShowModal(false);
          }}
        />
      ) : null}
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
