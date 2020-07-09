import React, {useState} from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import auth from "../auth";
import Spinner from "../components/Spinner";

export default function ProtectedRoute({children, ...rest}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Checks the authentication status with the api
    if (isLoading) {
        auth.checkAuthentication((result) => {
            setIsAuthenticated(result);
            setIsLoading(false);

        });
        
    }


    // Determines wether to wait, redirect or show the content 
    const content = isLoading
          ? Spinner
          : (isAuthenticated
             ? children
             : <Redirect to="/login"/>);

    return (
        <Route {...rest}>
          {content}
        </Route>);
}
        
