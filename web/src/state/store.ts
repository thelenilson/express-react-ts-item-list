// Libs
import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { authReducer } from "./modules/auth/reducers";
import { itemReducer } from "./modules/item/reducers";

const reducers = combineReducers({
  auth: authReducer,
  items: itemReducer,
});

const configureStore = (initialState: object) => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);

  const withDevTools = composeWithDevTools(middlewareEnhancer);

  const composedEnhancers = compose(withDevTools);
  const store = createStore(reducers, undefined, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./modules/auth/reducers.ts", () =>
      store.replaceReducer(reducers)
    );
  }

  return store;
};

export default configureStore({});
