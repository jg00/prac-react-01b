// import React from "react";  // Not needed b/c we are not using any React JSX.
const aux = props => props.children;

/*
    .children is a special property that simply outputs whatever gets entered between the opening and
    closing tag of this component.

    HOC essentially wraps another component.  It does not contain it's own logic, styling, add any
    structure to the JSX code or to the real DOM.  

    HOC just wraps another component and then may add some extra logic to it.
*/

export default aux;
