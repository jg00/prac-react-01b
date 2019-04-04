import React, { Component } from "react";
// import React, { Component, Fragment } from "react";  // For React.Fragment

import PropTypes from "prop-types";

import classes from "./Person.css";
import withClass from "../../../hoc/withClass2";
import Aux from "../../../hoc/Aux";

class Person extends Component {
  /*
    - Note on render() has to return one root element and then children elements.  
      However we can return adjacent JSX elements without a root but instead an array of elements
      but also needs to be provided the key.  Eventually this is an array of React.CreateElement().
      return [ , , , ]

      return [
        <p key='i1' onClick={this.props.click}>
            I am {this.props.name} and I am {this.props.age} years old!
          </p>, 
        <p key='i2'>{this.props.children}</p>,
        <input key='i3'>test</input>
      ]

    - Create an HOC as a wrapper is one alternative and we would us it as a wrapping component that does not render any actual HTML code but just
      there to fulfil React's requirement of having a wrapping expression.
        <Aux></Aux> is behaving as one root React.createElement() call to fulfill React's requirement.
      
    
    - React.Fragment is another option that comes with 16.2.
        Surround with <React.Fragment>...</React.Fragment>
        Or import Fragment from React and just use <Fragment>...</Fragment>
  */

  render() {
    console.log("[Person.js rendering...");
    return (
      <Aux>
        {/* <Fragment> */}
        <p onClick={this.props.click}>
          I am {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
        {/* </Fragment> */}
      </Aux>
    );
  }
}

/*
  'prop-types' package:
  After defining either a class or functional component you can define PropTypes here.

  Add property to Person.propTypes is a special property which you add to any Javascript 'Component Object'
  that React will watch out for 'in development mode' and React will give you a warning if you pass in 
  incorrect props.

  Provide object of key:value pairs and now using PropTypes you defined at the top upon import
*/

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);

/* Original before wrapping in Aux
  render() {
    console.log("[Person.js rendering...");
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click}>
          I am {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>

        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </div>
    );
  }
}

export default Person;
*/

/*
// Full code before converting to class based component used to see Update Lifecycle Component 
import React from "react";

import classes from "./Person.css";

const person = props => {
  console.log("[Person.js rendering...]");
  return (
    <div className={classes.Person}>
      <p onClick={props.click}>
        I am {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>

      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;


*/
