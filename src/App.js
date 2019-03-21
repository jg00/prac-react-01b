import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  // Class' Component State.  We use this to manage state from inside a component.  Props was used to get information from the outside.
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Stephanie", age: 26 }
    ],
    otherState: "some other value"
  };

  /*
    Note: If we change this special property called state, it will lead React to re-render
    (update) our DOM.

    Note: With React 16.8 a new feature called 'React Hooks' will allow us to also manage state
    in 'functional components' like we do here in 'class components' (default way of adding it).
  */

  switchNameHandler = () => {
    // console.log("Switch Name button was clicked!");
    // this.state.persons[0].name = "Maximilian"; // DON'T DO THIS - DO NOT 'MUTATE' STATE DIRECTLY.
    // use this.setState({}) method to allow us to update the special 'state' property and ensures
    // React knows about the change(s) and updates the DOM.

    // this.setState({}) takes an object argument and it will 'merge' whatever we define in the {}
    // with our existing state.

    // By 'Merge' we mean it will only update what we are overriding but it will not discard other properties
    // in our current state.

    // Only two things that lead React to update the DOM
    // Change in 'state'
    // Change in 'props'
    // If state or props changes, React analyzes the code it already rendered to the DOM and the
    // code it would now render if it were to re-render everything.  It then updates the existing
    // DOM in all the places wehre it needs to update it to reflect your new state and prop changes.

    // Here we will override persons since we defined a new version but it will leave the
    // property 'otherState' untouched since we are not defining any changes below for that property.
    this.setState({
      persons: [
        { name: "Maximillian", age: 28 },
        { name: "Manu", age: 29 },
        { name: "Stephanie", age: 27 }
      ]
    });
  };

  render() {
    return (
      <div className="App">
        <h1>My React App</h1>
        <p>
          This is JSX. All elements here (ex: div, h1, etc.) are provided by the
          React library. JSX gets compiled. It is Javascript in the end. JSX is
          just syntactic sugar for JavaScript, allowing you to write HTMLish
          code instead of nested React.createElement(...) calls.
        </p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        {/* <Person name="Max" age="28" /> */}
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
        >
          My Hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );

    // JSX gets comiled to this code below.
    // return React.createElement(
    //   "div",
    //   { className: "App" },
    //   React.createElement("h1", null, "some text!")
    // );
  }
}

export default App;
