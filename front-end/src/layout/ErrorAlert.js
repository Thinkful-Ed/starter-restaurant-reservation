import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  // If there's no error, the error is not an array, or the error has no length, there's no problem.
  if (!error || !Array.isArray(error) || !error.length) return null;
  // Otherwise, return each error in it's own error message box.
  else return (error.map((err, index) => {return <div key={index} className="alert alert-danger m-2">Error: {err}</div>}));
}

export default ErrorAlert;
