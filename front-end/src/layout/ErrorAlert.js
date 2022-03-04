import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  if (Array.isArray(error))
    return (
      error && (
        <div className="alert alert-danger m-2">
          Error:{" "}
          <li>
            {error.map((err, index) => (
              <ul key={index}>{err.message}</ul>
            ))}
          </li>
        </div>
      )
    );
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
