import React from "react";

function ErrorHandler() {
  const errorsArr = [
    "The restaurant is closed on Tuesdays.",
    "Only future reservations are allowed.",
    "The reservation time is before 10:30 AM.",
    "The reservation time is after 9:30 PM.",
  ];
  const listErrors = errorsArr.map((error, index) => {
    return <li key={index}>{error}</li>;
  });

  return (
    <div className="alert alert-danger">
      <p>Please fix the following errors:</p>
      <ul>{listErrors}</ul>
    </div>
  );
}

export default ErrorHandler;
