import React, { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {
  // Commented b/c Persons initial state is undefined and should not be called here.
  // However this does get fired as part of the "Component Creation Lifecycle"
  static getDerivedStateFromProps(props, state) {
    console.log("[Persons.js getDerivedStateFromProps");
    return state; // We don't have a state in Persons so will just be {}
  }

  // Legacy lifecycle
  // componentWillReceiveProps(props) {
  //   console.log("[Persons.js] componentWillReceiveProps", props);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons.js shouldComponentUpdate");
    // Here you would compare your current this.props to upcoming props 'nextProps'
    return true; // For now return true; required return
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    // return null;
    // Ex use: Previous scroll position can then be passed to componentDidUpdate().  After DOM updated, this previous position could then be used to update the DOM again.
    return { message: "Snapshot!" }; // Recieved in componentDidUpdate().
  }

  // Legacy lifecycle
  // componentWillUpdate() {
  //   console.log("[Persons.js componentWillUpdate");
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js componentDidUpdate");
    console.log(snapshot);
  }

  render() {
    console.log("[Persons.js] rendering...");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          changed={event => this.props.changed(event, person.id)}
          key={person.id}
        />
      );
    });
  }
}

export default Persons;

/*
// Full code before converting to class based component used to see Update Lifecycle Component 
import React from "react";
import Person from "./Person/Person";

const persons = props => {
  console.log("[Persons.js] rendering...");
  return props.persons.map((person, index) => {
    return (
      <Person
        click={() => props.clicked(index)}
        name={person.name}
        age={person.age}
        changed={event => props.changed(event, person.id)}
        key={person.id}
      />
    );
  });
};

export default persons;

*/
