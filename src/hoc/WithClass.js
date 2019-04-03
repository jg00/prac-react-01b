/* 

    1 WithClass.js (uppercase 'W') 
      - One way to creating HOC - by returning a 'functional component' like below.
      - Uppercase 'W' to indicate we are returning a 'functional component' and would be 
        used as a component in App.js.

    2 withClass2.js (uppercase 'w') 
      - Another way to creating HOC - is by using a regular Javascript function that
        'returns a functional component'.
      - Lowercase 'w' to indicate that this is 'not' a 'functional component'.  It is instead,
        a Javascript function that 'returns' a 'functional component'.
        
        In the regular Javascript function, the first argument will actually be our 'WrappedComponent' (ie a reference to
        a component), and the second argument (or more, passed as props), is something that 
        you need in your HOC. 

    Which way to use? Depends.
      1 First way where you wrap your JSX component in App.js may be good for 
        styling and/or some HTML changes.
    
      2 Second way where you wrap your entired component may be better if you want to add some
        'behind the scenes logic'.  Some Javascript code that handles errors or sends some anylytics
        data, etc.
*/

import React from "react";

/*
    HOC - general concept is simply that you have a component that wraps other components
    that adds something to it.  It could add styling, additonal HTML, or even some logic.

    In this example, it just shows adding a <div> with a className.

*/

// Rememeber this is a 'functional component'
const withClass = props => (
  <div className={props.classes}>{props.children}</div>
);

export default withClass;

/*
    props.classes can be named anything.  This will be a property you expect to get on that
    higher order component.

*/
