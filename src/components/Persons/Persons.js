// import React, { Component } from "react";
import React, { PureComponent } from "react";
import Person from "./Person/Person";
// import AuthContext from "../../context/auth-context";  // Will not be used here

// class Persons extends Component {
class Persons extends PureComponent {
  // Commented getDerivedStateFromProps(props, state) b/c Persons initial state is undefined and should not be called here.
  // However this does get fired as part of the "Component Creation Lifecycle"
  /*
    static getDerivedStateFromProps(props, state) {
      console.log("[Persons.js getDerivedStateFromProps");
      return state; // We don't have a state in Persons so will just be {}
    }
  */

  // Legacy lifecycle
  // componentWillReceiveProps(props) {
  //   console.log("[Persons.js] componentWillReceiveProps", props);
  // }

  /* shouldComponentUpdate() kept for reference but no longer needed since we extend PureComponent

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Persons.js shouldComponentUpdate");

      // Here you would compare your current this.props to upcoming props 'nextProps'
      // this.props.persons is our current state.  This can improve our app's performance.
      // If no change then no need to re-render (ie no need to run render() in this component).
      // Remember in this scenario 'persons' is an array below we are comparing the pointers to the Array []
      // but works here becasue of how we are updating the 'persons' array in App.js (in nameChangeHandler)
      // where we are getting a copy of the array, updating a person, and setting the new array
      // to a new pointer.
    
    if (nextProps.persons !== this.props.persons) {
      return true;
    } else return false;
    
      // PureComponents - Use if we want to check if 'all' props of a component changed instead
      // of shouldComponentUpdate().  PureComponents already implements shouldComponentUpdate()
      // with a complete props check.

      // Persons.js is really using not just persons data changes and but also other functions.
      // What if we did have a change in those functions?  We can simply use PureComponents.

      // if (nextProps.persons !== this.props.persons
      //   || nextProps.changed !== this.props.changed
      //   || nextProps.clicked !== this.props.clicked) {
      //   return true;
      // } else return false;
    
    // return true; // For now return true; required return
  }
  */

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

  // For scenarios where you want to do some clean up of for example event listeners, database connections, etc.
  // Place here any code you want ot run right before the component is removed.
  componentWillUnmount() {
    console.log("[Persons.js componentWillUnmount");
  }

  /*
    Note that this was only here for reference.  The point of the using Context was so we
    "skip" having to push props through Persons.js.  Properties will already be available to Person.js.
    
    <AuthoContext.Consumer> takes in a function as a child and not JSX.
    (context) => context is the object (or any values your received from the Provider) <AuthoContext.Provider value={{,,}}
  */
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
          // isAuth={this.props.isAuthenticated} // only forwards this to Person.js; No longer forwarded to Person.js b/c using Context
        />
      );
    });
  }
}

/*  Kept for ref 'if' we were going to use it here but we are 'skipping' this extra forwarding of 'props' to Person.js
    return (
      <AuthContext.Consumer>

        {(context) => this.props.persons.map((person, index) => {
          return (
            <Person
              click={() => this.props.clicked(index)}
              name={person.name}
              age={person.age}
              changed={event => this.props.changed(event, person.id)}
              key={person.id}
              isAuth={this.props.isAuthenticated} // only forwards this to Person.js
            />
          );
        })}

      </AuthContext.Consumer>
    );
  }
}
*/

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
