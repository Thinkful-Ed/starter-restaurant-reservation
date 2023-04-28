import React from "react";

export const ResCard = ({ reservation }) => {
  return (
    <article className="card">
      <div className="card-body ">
        <h2 className="card-title">
          {`${reservation.first_name} ${reservation.last_name}`}
        </h2>
        <ul>
          <li>{`Time: ${reservation.reservation_time}`}</li>
          <li>{`People: ${reservation.people}`}</li>
          <li>{`Contact: ${reservation.mobile_number}`}</li>
        </ul>
      </div>
    </article>
  );
};

export default ResCard;
