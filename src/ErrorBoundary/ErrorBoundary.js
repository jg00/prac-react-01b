/* 
    React 16+ ErrorBoundary HOC feature that can be used to wrap code that may fail
    at runtime and catch any error that componenet will throw.

    Only use ErrorBoundary feature for cases where you know some code may fail and you can't control that.
    Do not use everywhere.

    Note that in development you still get the error.  But in production you will get what your 
    return is in the render below when error is caught.  

    Nice tool in production to show a nice custom error page and not have your whole application fail.
*/

import React, { Component } from "react";
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ""
  };

  // Will be executed whenever a Component we wrap with the ErrorBoundary throws an error
  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };

  render() {
    if (this.state.hasError) {
      // We only want to return this if we get an error
      return <h1>{this.state.errorMessage}</h1>;
    } else {
      // You can access props in a class Component but you need this.props
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
