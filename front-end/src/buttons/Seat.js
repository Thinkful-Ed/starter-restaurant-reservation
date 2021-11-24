import React from "react";
import { Link } from "react-router-dom";

function Seat() {
  const handleClick = () => {};

  return (
    <Link to={`/reservations/${`reservation_id`}/seat`} onClick={handleClick}>
      Seat
    </Link>
  );
}

export default Seat;
