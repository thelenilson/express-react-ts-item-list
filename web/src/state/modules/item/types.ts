export const SET_ITEM_LIST = "items/SET_ITEM_LIST";
export const SELECT_ITEM = "items/SELECT_ITEM";
export const UNSELECT_ITEM = "items/UNSELECT_ITEM";
export const SELECT_ALL = "items/SELECT_ALL";

export interface Item {
  id: number;
  name?: string;
}

export interface ItemState {
  items: Item[];
  selectedItems: number[];
}

export interface SetItemList {
  type: typeof SET_ITEM_LIST;
  payload: Item[];
}

export interface SelectItem {
  type: typeof SELECT_ITEM;
  payload: number;
}

export interface UnselectItem {
  type: typeof UNSELECT_ITEM;
  payload: number;
}

export interface SelectAll {
  type: typeof SELECT_ALL;
}

export type ItemActionTypes =
  | SetItemList
  | SelectItem
  | UnselectItem
  | SelectAll;
