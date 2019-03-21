/*
    Creating a Functional Component (ie not a class that extends Component).
    We can then use this component in our root component App.js.

    1 In it's simplest form, a component is just function that return JSX.  
    Use ES6 syntax which is recommended for React applications.

    2 We need to do two other things.
        a. import React b/c the JSX element is transformed using React.createElement(,,)
        b. export the function
    
    3 We don't need { Component } though b/c here we are not using a class which extends Component, 
    instead we are creating a function.
*/

import React from "react";

const person = props => {
  return (
    // <p>I'm {props.name} and I am {Math.floor(Math.random() * 30)} years old!</p>
    <div>
      <p>
        I'm {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
    </div>
  );
};

export default person;
