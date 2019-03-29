import React, { Component } from "react";

import classes from "./Person.css";

class Person extends Component {
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
