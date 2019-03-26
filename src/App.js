import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  // Class' Component State.  We use this to manage state from inside a component.  Props was used to get information from the outside.
  state = {
    persons: [
      { id: "aa1", name: "Max", age: 28 },
      { id: "aa2", name: "Manu", age: 29 },
      { id: "aa3", name: "Stephanie", age: 26 }
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

  // We could have also passed the index instead of id
  nameChangedHandler = (event, id) => {
    // 1 Find person by index, make copy of original person obj, and finally update the person obj copy.
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    // const person = this.state.persons[personIndex] // DO NOT USE THIS SINCE JAVASCRIPT OBJECTS ARE REFERENCE TYPES.
    // Here we end up pointing to the object which we could potentially 'MUTATE'.  Make a copy like below.
    const person = { ...this.state.persons[personIndex] };

    // Object.assign({}, obj) is an alterntive to spreading properties of the person object using spread operator.
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    // 2 Now make a copy of the full person's array and then update the specific person object at personIndex
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });

    // Kept for reference to show initial state
    /*
    this.setState({
      persons: [
        { name: "Max", age: 28 },
        { name: event.target.value, age: 29 },
        { name: "Stephanie", age: 26 }
      ]
    });
    */
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons; // current state
    this.setState({
      showPersons: !doesShow
    });
  };

  /*
    Flaw - Objects and Arrays in Javascript are reference types.  So when we are using
      const persons = this.state.persons,
    we actually 'get a pointer' to the original persons object managed by React (ie the original state).
    If we then splice it here, we already 'mutated' this original data (BAD PRACTICE - THIS CAN LEAD
    TO UNPREDICTABLE APPS!)

    A GOOD PRACTICE is to craete a COPY of your array before manipulating it.

    On way to make copy is by calling .slice() without arguments.  This retunrs a copy of your array.
  */
  deletePersonHandler = personIndex => {
    // const persons = this.state.persons; // BAD PRACTICE b/c this is a pointer to original object managed by React.
    // const persons = this.state.persons.slice(); // Notes .slice() and not .splice() here.  This is one way to make a copy of the full array(elements)
    const persons = [...this.state.persons]; // Another way is to use ... ES6 spread operator to get new array copy of objects

    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  };

  render() {
    /* 
      Inline styles - this is a Javascript object.  Values need to be in quotes and have to be strings. 
      Scoped to this component or the element you added it to like the button below.

      By default, with inline styles, we cannot use pseudo selectors, media queries.
      However we can use third-party library called 'Radium'
    */
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    /*
      Alternative to rendering content conditionally before returning the JSX below.
      Outside of JSX return() below we can write normal javascript code (like if..else statements)

      
    */
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={event => this.nameChangedHandler(event, person.id)}
                key={person.id}
                /* 
                  'key' property is needed to allow React to keep track of the individual elements 
                  so that it has a clear property it can compare between the different elements to 
                  find out which elements changed and which didn't so it only rerenders the elements 
                  which changed.

                  Here {person.id} is provided that React can uniquely use to compare elements of the future
                  with elements of the past.

                  'index' is not really a good identifier b/c it the list chnages every element will receive
                  a new 'index' at least every element after the change.
                */
              />
            );
          })}
        </div>
      );

      /* After setting person variable above we can conditionally update the style {} object. 
         Style object is a const but we are assigning a value to one of it's properties.
      */
      style.backgroundColor = "red";

      /*
      // Kept for reference before handling using javascript list
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
    */
    }

    // One technique for assinging and updating list of classNames
    // let classes = ["red", "bold"].join(" "); // We get "red bold"
    // const is fine since we are not assigning a new value.
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red"); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold"); // classes = ['red', 'bold']
    }

    return (
      <div className="App">
        <h1>My React App</h1>

        {/*  We could also assign className dynamically.  See classes variable above.  One way of doing this with array. */}
        <p className={classes.join(" ")}>JSX JSX JSX</p>

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

        {/* Another way of conditionally rendeing content vs using ternary operations. */}
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
