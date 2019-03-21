import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
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
        <Person name="Max" age="28" />
        <Person name="Manu" age="29">
          My Hobbies: Racing
        </Person>
        <Person name="Stephanie" age="26" />
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
