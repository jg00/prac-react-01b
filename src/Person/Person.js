/*
    Creating a Functional Component (ie not a class that extends Component).
    We can then use this component in our root component App.js.

    1 In it's simplest form, a component is just function that return JSX.  
    Use ES6 syntax which is recommended for React applications.

    2 We need to do two other things.
        a. import React b/c the JSX element is transformed using React.createElement(,,)
        b. export the function
    
    3 We don't need { Component } though b/c here we are not using a class which extends Component, 
    instead we are creating a function.
*/

import React from "react";

/*
  B/c of Webpack build tool we can now import .css into Javascript.  During build webpack will 
  add to our HTML file.  These styles are later injected dynamically by webpac into our ./public/index.html file.
*/
// import "./Person.css";
import classes from "./Person.css";

/*
  ---- CSS Modules ----
  - Wouldn't it great if a CSS file (like Person.css) could be scoped to the Person.js comonent file
  so that whichever styles we define in Person.css could be 'imported' and assigned to elements in 
  Person.css component file and wouldn't override styles in other components or other parts of the app
  even if we were to share the names of the CSS classes.
  - This is possible using a feature called CSS Modules.

  Steps:

  - 1 Loaders required
    npm install css-loader
      css-loader 'parses css files' and 'applies various transformations' to it.
    npm install style-loader
      style-loader 'injects' the styles into the DOM head

    Webpack loaders are functions that take an input and give an output.

  - 2 Move your .css files within a react folder to make them accessible to react components and
    recommended to name .css files after their corresponding components.

  - 3 Import (ex: Sidebar.js component) and refactor
    import styles from '../styles/Sidebar.css'

    return (
      <sidebar>
        <img src="juke.svg" className = "logo" />
        <img src="juke.svg" className = { styles.logo } />  // Local scoping
        <section>
          <h4 className="menu-item">
          <h4 className={ styles['menu-item'] }>  // Local scoping. Also bracket notatin b/c of hyphen.  Recommends camelCase for CSS classes.

          <li key={playlist.id} className="playlist-item menu-item">
          <li key={playlist.id} className={`${styles['playlist-item'] } menu-item`}>  // local and global scoping combined
        </section>
      </sidebar>
    )


  ---- React CSS Modules ----
    - Different from above in that it can use styleName instead in addition to className in JSX. 
    - Lets you separate out the interpolation of global class into className like above.
    - <div className='global-css' styleName='local-module'></div>
    

  ---- Radium ----
  - Third party package that allow you to use inline styles with features like media queries and pseudo classes.
  - This is on way of scoping your styles to this module. (See other app in /sec05-Styling-Components-Elements/radium/..)
  - @media use in in-line styles will require the entire app to be wrapped with <StyleRoot>.
  See App.js file's return() statement.
*/

const person = props => {
  // Kept for reference only to throw error to be caught by ErrorBoundary
  const rnd = Math.random();
  if (rnd > 0.7) {
    throw new Error("Something went wrong");
  }

  return (
    // <p>I'm {props.name} and I am {Math.floor(Math.random() * 30)} years old!</p>
    // <div className="Person">
    <div className={classes.Person}>
      <p onClick={props.click}>
        I am {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      {/*Two way binding - we listen to changes which updates the state and we pass down state values*/}
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;
