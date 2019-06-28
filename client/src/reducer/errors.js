import { SET_ERRORS } from "../contants";

const initialState = {
  errors: {}
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
