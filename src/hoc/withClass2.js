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
*/

import React from "react";

// Regular Javascript function.  'W'rappedComponent is capitalized b/c we want to use it as a component in our JSX.
const withClass = (WrappedComponent, className) => {
  // Here you return a 'functional component'
  return props => (
    <div className={className}>
      <WrappedComponent />
    </div>
  );
};

export default withClass;
