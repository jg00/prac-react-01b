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

// Regular Javascript function.  'W'rappedComponent is capitalized b/c we want to use it as a component in our JSX.
const withClass = (WrappedComponent, className) => {
  /*
    1 Here you return a 'functional component'

    2 Passing props dynamically is a feature of Javascript and React.
    Below we do accept 'props' from Person's'.js and this will be the props of our WrappedComponent.
    There is a JSX syntax to allow us to 'forward' props.  
    Actually React automatically takes all the attributes you add to your JSX code
    and combines them in a 'props object'. (this is why you  ca't use props={props})
    So you need to spread the props object attirbute using spread operator {...props} to distribute
    them as key:value pairs.
    In the end if props is { name:'Max', age:28 }
      <WrappedComponent {...props} /> 
    it will look like
      <WrappedComponent name:'Max' age:28/>
  */
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass;
