import {
  ItemState,
  ItemActionTypes,
  SET_ITEM_LIST,
  SELECT_ITEM,
  UNSELECT_ITEM,
  SELECT_ALL,
} from "./types";

const initialState: ItemState = {
  items: [],
  selectedItems: [],
};

export function itemReducer(
  state = initialState,
  action: ItemActionTypes
): ItemState {
  switch (action.type) {
    case SET_ITEM_LIST:
      return {
        ...state,
        items: action.payload,
      };
    case SELECT_ITEM:
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    case UNSELECT_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (id) => id !== action.payload
        ),
      };
    case SELECT_ALL:
      return {
        ...state,
        selectedItems:
          state.selectedItems.length === state.items.length
            ? []
            : state.items.map((item) => item.id),
      };
    default:
      return state;
  }
}
