import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducer/root";

const initialState = {};

const middleware = [thunk ] ;

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //nhớ xóa khi deploy vì user sẽ ko có cài đặt extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
