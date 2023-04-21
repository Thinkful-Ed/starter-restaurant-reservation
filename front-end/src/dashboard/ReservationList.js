import React from "react";
import ResCard from "./ResCard";


export const ReservationList = ({reservations}) => {
  const list = reservations.map((reservation) => <ResCard key={reservation.reservation_id} reservation={reservation} />);

  return (
    <div>
      <section className="col">{list}</section>
    </div>
  );
};

export default ReservationList;
