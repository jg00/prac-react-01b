import React, { useEffect, useRef } from "react";
import classes from "./Cockpit.css";

/*
  I
  useEffect(()=>{... [return () => {...}] }, [dependencies, ...])

    - dependencies (control when useEffect() should run):
      optional array of specified variables/data to control 'when' this function executes
      or pass an empty array [] if you want function to execute only the first time.
    
    - return () => {...}
      The clean-up function runs before the component is removed from the UI 
      to prevent memory leaks. Additionally, if a component renders multiple times 
      (as they typically do), the previous effect is cleaned up before executing 
      the next effect. In our example, this means a new subscription is created 
      on every update. 

    - takes a function that will run for every render cycle of the current functional component (the Cockpit.js in this case).
    - Here it runs for every update.  This means we can use it for all things we could do 
      in ComponentDidUpdate().  
    - So we can do things like HTTP requests, etc.
    - useEffect() also runs when component is created.

    - useEffect() combines componentDidMount() and componentDidUpdate() combined in one effect.
    - some hooks like getDerivedStateFromProps(props, state) are not included and not really
      needed because you could use useState() and base your state on the props sent to this functional component.
    
    - Multiple useEffect()s can be used if you have changes to different data
  */

/*
    II Using Refs with React Hooks in functional components.
    - You do not use React.createRef().  This was only for class components.  Example in Person.js.

  */

const cockpit = props => {
  // Lets say you wan to autmatically click the toggle persons button whenever the entire page loads.
  const toggleBtnRef = useRef(null); // You could pass initial value here but for now pass null
  // toggleBtnRef.current.click();  // Won't work here because render() will not have run yet.

  useEffect(() => {
    console.log("[Cockpit.js] useEffect");

    /*
    // HTTP requests..  What if want to send an HTTP request but only for the 'first' time and not for every rerender (virtual DOM) cycle?
    setTimeout(() => {
      alert("Saved data to cloud!");
    }, 1000);
    */

    toggleBtnRef.current.click(); // we now have access to toggleBtnRef b/c useEffect() runs after every render().

    // Optional useEffect() return statement for clean up if needed.
    // (Important) Runs BEFORE the main useEffect functions, AFTER the (first) render cycle.
    return () => {
      // clearTimeout(timer);  // This is an example of clean up.  You can set setTimeout to variable timer.
      console.log("[Cockpit.js] cleanup work in useEffect()"); // In this example Cockpit is never removed so will not trigger.
    };
  }, []); // or pass an empty array to run initially only or specify array [props.persons]

  // With second arg is set you are controlling when this useEffect() should run.
  // In this case, this useEffect() only runs first time mounted and when unmounted b/c set to [].

  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    return () => {
      console.log("[Cockpit.js] cleanup work in 2nd useEffect()");
    };
  }); // This will run for every update cycle.

  const assignedClasses = [];
  let btnClass = "";

  if (props.showPersons) {
    btnClass = classes.Red;
  }

  /*
  Originally we are sending props.person and calculating the array length here.  A change
  in the name is still causing Cockpit to rerender.
  Instead of determining the length of the persons array inside of Cockpit we will send in the
  length from outside.  Only when that is different then we want to rerender Cockpit.

  */
  // if (props.persons.length <= 2) {
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  // if (props.persons.length <= 1) {
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>
        Display/Remove Components, Update Text
      </p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <button onClick={props.login}>Log in</button>
    </div>
  );
};

/*
  React.memo(functional component) 
  - Helps control when components rerender
  - React will store a snapshot of this component and only if it's input changes (ie props), it
    will rerender it.
  - If inputs do not change and some parent component wants to update this Cockpit component,
    React will instead give back that stored component.
*/
// export default cockpit;
export default React.memo(cockpit);
