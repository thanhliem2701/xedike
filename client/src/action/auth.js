import axios from "axios";
import _ from "lodash";
import getFingerPrint from "../helpers/getFingerPrint";
import jwtDecode from "jwt-decode";
import setHeaders from "../helpers/setHeaders";
import { SET_ERRORS, SET_CURRENT_USER } from "../contants";

export const setErrors = err => {
  return {
    type: SET_ERRORS,
    payload: err
  };
};

// export const testprivate = (data, history) => {
//   return dispatch => {
//     getFingerPrint(fingerPrint => {
//       axios.defaults.headers.common["Authorization"] = token;
//       axios.defaults.headers.common["fingerprint"] = fingerPrint;

//       axios
//         .get("/api/users/test-private")
//         .then(res => console.log(res))
//         .catch(err => console.log(err));
//     });
//   };
// };

export const logOut = () => {
  return dispatch => {
    // xoa localstorage
    localStorage.removeItem("token");
    // xoa current user
    dispatch(setCurrentUser({}));
    // xoa header
    setHeaders();
  };
};

export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

export const login = (data, history) => {
  console.log(data);
  const { email, passWord } = data;
  return dispatch => {
    getFingerPrint(fingerPrint => {
      axios
        //   .post("http://localhost:5000/api/users/register", this.state)
        .post("/api/users/login", { email, passWord, fingerPrint })
        .then(res => {
          // console.log("response: ", res);
          const token = res.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          dispatch(setCurrentUser(decoded));
          // console.log(decoded);
          setHeaders(token,fingerPrint);
          dispatch(setErrors({}));
          console.log(fingerPrint);
          alert("Login success !")
          //   axios.defaults.headers.common["Authorization"] = token;
          //   axios.defaults.headers.common["fingerprint"] = fingerPrint;
          //Authorization
        })
        .catch(err => {
          if (err) {
            dispatch(setErrors(_.get(err, "response.data", {})));
          }
          console.log(err);
          // console.log(err.response.data);
          //   this.setState({
          //     errors: _.get(err, "response.data", {}) // dấu {} phía sau nghĩa là trường hợp ko có dữ liệu thì object rỗng, né undefine
          //   });
        });
    });
  };
};

export const getMyProfile =(id,callback) => {
  return (dispatch) => {
    axios.get(`/api/users/${id}`)
    .then(res => {
      dispatch(setCurrentUser(res.data))
      callback(res.data);
    })
    .catch(err => {
      if(err) {
        dispatch(setErrors(_.get(err, "response.data", {})));
      }
    })
  }
}

export const register = (data, history) => {
  return dispatch => {
    axios
      // .post("http://localhost:5000/api/users/register", this.state)
      .post("/api/users/register", data)
      .then(res => {
        // console.log("response: ", res);
        // this.setState({
        //   errors: {}
        // });
        dispatch(setErrors({}));
        alert("Register successful !");
        history.push("/registersuccess");
      })
      .catch(err => {
        if (err) {
          dispatch(setErrors(_.get(err, "response.data", {})));
        }

        // this.setState({
        //   // dấu {} phía sau nghĩa là trường hợp ko có dữ liệu thì object rỗng, neu undefine
        //   errors: _.get(err, "response.data", {})
        // });
      });
  };
};
