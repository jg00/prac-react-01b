/*
    Here we create a context object.
    React.createContext({initial}) - Allows us to provide a default value (Object, string, array, number, etc..)
    
    What a React.createContext() is in the end is a 'globally available Javascript Object' 
    (by globally however it means 'you' decide where it will be available).

    It can be 'passed' between React components without using props.

    Only reason initializing with login: () => {}
    If you initialize default value(s) with everything you want to be able to access
    on this context from different components in this application, then you get better
    auto-completion from the IDE.
*/

import React from "react";

const authContext = React.createContext({
  authenticated: false,
  login: () => {} // Note this is just an empty anonymous function.
});

export default authContext;
