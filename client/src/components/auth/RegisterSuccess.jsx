import React from 'react';
import { Label} from "reactstrap";
import {Link} from "react-router-dom"
const RegisterSuccess = () => {
    return (
        <div className="container text-left">
            <h1>Register Successful</h1>
            <Label >

              Click <Link
              activeStyle={{ color: "white" }}
              to="/login"
            >
              here
            </Link> to return to login page.
            </Label>

        </div>
    );
};

export default RegisterSuccess;