import React, { Component } from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
// import WithClass from "../hoc/WithClass";  // One way of implementing an HOC
import withClass from "../hoc/withClass2";
import Aux from "../hoc/Aux";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: "aa1", name: "Max", age: 28 },
      { id: "aa2", name: "Manu", age: 29 },
      { id: "aa3", name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state; // You should return updated state but here we are just returning current state
  }

  // Legacy lifecycle
  // componentWillMount() {
  //   console.log("App.js] componentWillMount");
  // }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  // Within App.js, there is a state change when a persons.name is updated (event persons.showPersons).  So Update Lifecyle hooks also occur in App.
  // shouldComponentUpdate() must return a true (default if you do not include this hook) or false (based on some logic).
  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    // return false; // Here you can 'prevent/control' updates
    return true;
  }

  // You can also have getSnapshotBeforeUpdate(prevProps, prevState){...} if you wnated to
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[App.js] getSnapshotBeforeUpdate");
    return { message: "[App.js] Snapshot!" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[App.js] componentDidUpdate");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons]; // Remeber this is a new array in memory and it's address (pointer) is saved to the variable 'persons'.
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  };

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  };

  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons} // Note that a change to the state that is passed as a prop in Persons class component will 'trigger' the 'Update lifecycle hook' in Persons.
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <Aux>
        {/* <WithClass classes={classes.App}> */}
        {/* <div className={classes.App}> */}

        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>

        {this.state.showCockpit ? (
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            // persons={this.state.persons}  // Not sending b/c a change in name will cause Cockpit to rerender.  We want to rerender instead on change of array length.
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
          />
        ) : null}

        {persons}

        {/* </div> */}
        {/* </WithClass> */}
      </Aux>
    );
  }
}

/*
  HOC notes: 
  This is our second way of implementing a HOC.
  Here where you 'export your entire App component' you now call a Javascript function, pass it
  'the entire App Component and any other data, and finally this function returns a 'functional
  component' that we modified in 'withClass2.js'
*/

export default withClass(App, classes.App);
