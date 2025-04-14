import { Navigate } from "react-router";
import { Component } from "react";

const authRequired = (Component) => {

    const AutheticatedComponent = (props) => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            return <Navigate to="/sign-up" />;
        }
        return <Component {...props} />;
    }
    return AutheticatedComponent;

}



export default authRequired;
