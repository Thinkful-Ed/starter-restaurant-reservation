import React from "react";

function ErrorAlert({ error }) {
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
