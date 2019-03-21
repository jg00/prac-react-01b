/*
  App-HookVersion-useState.js is a version of App.js using React Hooks.
  This is a reference to using React Hooks.
  To use, temporarily update index.js
    // import App from "./App"; << comment line
    import App from "./App-HookVersion-useState";

  React Hooks available on React v16.8 onwards.

  React Hooks allow us to manage state in functional components.

  Summary: So with multiple useState()s with different state slices is how we manage state in a 
  function component with React Hooks.  Unlike class components we only have one state and updated
  (we do not mutate state) using this.setState({}) function.
*/

import React, { useState } from "react";
import "./App.css";
import Person from "./Person/Person";

/*
  [currentState(ie initialState), fxToUpdateState] = useState(initialState)

  useState takes in initialState argument and always returns an array with excatly two elements.  
  1st element will always be current state (ie the initialState).
  2nd element will always be a function that allows us to update this state such that React is
  aware of it and will re-render this component.
  
  Important to know that when using React Hooks, the useState's 2nd element function does
  not 'merge' whatever you pass to it with the old state but instead 'replaces' the old state.
  This means you need to manually include all 'old' state data.

  However, the more elegant (alternative) way is to not manually include the 'old' state items, but
  instead use useState({other properties you want to have state}) multiple times.

  In class based components you only have one state property and this.setState({}) method 
  automatically 'merges' changes with the old state to not discard any state.

  Summary: So with multiple useState()s with different state slices is how we manage state in a 
  function component with React Hooks.  Unlike class components we only have one state and updated
  (we do not mutate state) using this.setState({}) function.

*/

const app = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Stephanie", age: 26 }
    ],
    otherState: "some other value"
  });

  // Elegant way is to use useState({}) for our other properties we want to manage.
  // useState({otherState:'some third string'})  // initial state we want to manage can be object, string, integer, boolean, etc.  Whatever your app needs.
  // Here we are not updating this 'otherState' slice and not using the function setOtherState at all but we could.
  const [otherState, setOtherState] = useState("some third string");

  console.log(personsState, otherState);

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: "Maximillian", age: 28 },
        { name: "Manu", age: 29 },
        { name: "Stephanie", age: 27 }
      ],
      otherState: personsState.otherState // Manually including 'old' state data in the update function
    });
  };

  return (
    <div className="App">
      <h1>My React App</h1>
      <p>This is JSX.</p>
      <button onClick={switchNameHandler}>Switch Name</button>

      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
      />
      <Person
        name={personsState.persons[1].name}
        age={personsState.persons[1].age}
      >
        My Hobbies: Racing
      </Person>
      <Person
        name={personsState.persons[2].name}
        age={personsState.persons[2].age}
      />
    </div>
  );
};

export default app;
