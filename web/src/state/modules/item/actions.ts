import {
  Item,
  SET_ITEM_LIST,
  ItemActionTypes,
  SELECT_ITEM,
  UNSELECT_ITEM,
  SELECT_ALL,
} from "./types";

export function setItemList(list: Item[]): ItemActionTypes {
  return {
    type: SET_ITEM_LIST,
    payload: list,
  };
}

export function selectItem(id: number): ItemActionTypes {
  return {
    type: SELECT_ITEM,
    payload: id,
  };
}

export function unselectItem(id: number): ItemActionTypes {
  return {
    type: UNSELECT_ITEM,
    payload: id,
  };
}

export function selectAll(): ItemActionTypes {
  return {
    type: SELECT_ALL,
  };
}
