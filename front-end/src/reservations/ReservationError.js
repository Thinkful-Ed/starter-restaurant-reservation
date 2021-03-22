import React from "react";

function ReservationErrors({ errors = [] }) {
  if (errors.length > 0) {
      return (
        <div className="alert alert-danger">
          Error:
            {errors.map((error) => (
              <p>{error.message}</p>
            ))}
        </div>
      );
  }
}

export default ReservationErrors;
