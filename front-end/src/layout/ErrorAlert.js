import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  if (error.length === 0) {
    return null;
  } else {
    return error.map((err, index) => {
      return (
        <div key={index} className="alert alert-danger m-2">
          Error: {err}
        </div>
      );
    });
  }
}

export default ErrorAlert;
