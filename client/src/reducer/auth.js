import _ from "lodash";
import { SET_CURRENT_USER } from "../contants";

const initialState = {
  profile: {}, //decoded
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        profile: action.payload,
        // Nếu isEmpty của action.payload mà là true nghĩa là chưa đăng nhập
        // ko có token
        isAuthenticated: !_.isEmpty(action.payload)
      };
    
    default:
      return state;
  }
};

export default authReducer;
