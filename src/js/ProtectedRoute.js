import React, {useState} from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import auth from "./auth";

export default function ProtectedRoute({children, ...rest}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Checks the authentication status with the api 
    auth.checkAuthentication((result) => {
        setIsAuthenticated(result);
        setIsLoading(false);

    });


    // Determines wether to wait, redirect or show the content 
    const content = isLoading
          ? null
          : (isAuthenticated
             ? children
             : <Redirect to="/login"/>);

    return (
        <Route {...rest}>
          {content}
        </Route>);
}
        
