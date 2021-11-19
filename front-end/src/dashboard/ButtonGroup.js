import React from "react";

function ButtonGroup() {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-secondary">
        Previous
      </button>
      <button type="button" className="btn btn-secondary">
        Today
      </button>
      <button type="button" className="btn btn-secondary">
        Next
      </button>
    </div>
  );
}

export default ButtonGroup;
