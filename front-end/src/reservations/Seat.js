import React from "react";
import { useParams } from "react-router-dom";

export default function Seat() {
  const params = useParams();

  return (
    <div>
      <h1>Seat</h1>
      <h4>Reservation {`${params.reservation_id}`}</h4>
      <form>
        <select name="table_id" />
      </form>
    </div>
  );
}
