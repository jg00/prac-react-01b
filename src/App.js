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
    ]
  };

  /*
    Note: If we change this special property called state, it will lead React to re-render
    (update) our DOM.

  */

  /*
    Note: With React 16.8 a new feature called 'React Hooks' that will allow us to also manage state
    in 'functional components' like we do here in 'class components' (default way of adding it).
  */

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
        <button>Switch Name</button>
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
