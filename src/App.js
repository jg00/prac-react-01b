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
    otherState: "some other value",
    showPersons: false
  };

  /*
    Note: If we change this special property called state, it will lead React to re-render
    (update) our DOM.

    Note: With React 16.8 a new feature called 'React Hooks' will allow us to also manage state
    in 'functional components' like we do here in 'class components' (default way of adding it).
  */

  switchNameHandler = newName => {
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
        { name: newName, age: 28 },
        { name: "Manu", age: 29 },
        { name: "Stephanie", age: 27 }
      ]
    });
  };

  nameChangedHandler = event => {
    this.setState({
      persons: [
        { name: "Max", age: 28 },
        { name: event.target.value, age: 29 },
        { name: "Stephanie", age: 26 }
      ]
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons; // current state
    this.setState({
      showPersons: !doesShow
    });
  };

  render() {
    /* 
      Inline styles - this is a Javascript object.  Values need to be in quotes and have to be strings. 
      Scoped to this component or the element you added it to like the button below.
    */
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    /*
      Alternative to rendering content conditionally before the returning the JSX below.
      Out side of JSX return() below we can write normal javascript code (like if..else statements)
    */
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
          />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, "Max!")} // Passing method refrence as props between components.
            changed={this.nameChangedHandler}
          >
            My Hobbies: Racing
          </Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <h1>My React App</h1>
        <p>
          This is JSX. All elements here (ex: div, h1, etc.) are provided by the
          React library. JSX gets compiled. It is Javascript in the end. JSX is
          just syntactic sugar for JavaScript, allowing you to write HTMLish
          code instead of nested React.createElement(...) calls.
        </p>
        {/* Alternatives to passing arguments */}
        {/* <button onClick={this.switchNameHandler}>Switch Name</button> */}
        {/* <button onClick={this.switchNameHandler.bind(this, "Maximillian")}> */}

        {/*
          By using arrow function, in the function body, what we return is a function call (this is why 
          we added the parenthesis).
          
          The key here is that the function call is 'not getting executed immediately'.  Instead what
          we pass here is an 'anonymous function' which will be excuted on a click and
          which then returns the result of this function getting executed which finally leads
          to the this.setState() function getting executed to re-render the DOM.

          Arrow function with one line 'implicitly' adds a 'return'.
          onClick={() => this.switchNameHandler("Maximillian!!")}

        */}

        <button
          style={style} // JSX style attibute
          // Keep for reference
          // onClick={() => {
          //   return this.switchNameHandler("Maximillian!!");
          // }}

          onClick={this.togglePersonsHandler}
        >
          {/* Switch Name */}
          Toggle Persons
        </button>

        {persons}

        {/* Remember in the end we are calling React.createElement() behind the scenes */}
        {/* Below is one way to conditionally render content (using ternary operation) or we could do it above before render() is called. */}
        {/*
        {this.state.showPersons ? ( 
          <div>
            <Person
              name={this.state.persons[0].name}
              age={this.state.persons[0].age}
            />
            <Person
              name={this.state.persons[1].name}
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, "Max!")} // Passing method refrence as props between components.
              changed={this.nameChangedHandler}
            >
              My Hobbies: Racing
            </Person>
            <Person
              name={this.state.persons[2].name}
              age={this.state.persons[2].age}
            />
          </div>
        ) : null} 
        */}
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
