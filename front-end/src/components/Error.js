import React from "react";

export default function ErrorAlert({error}) {
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
}