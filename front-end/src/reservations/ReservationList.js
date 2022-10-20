import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import  { cancelRes } from "../utils/api";

function ReservationList({ reservation }){
    const {
        reservation_id,
        first_name,
        last_name,
        people,
        reservation_time,
        status,
    } = reservation;

return (
    <div>
        <div>
            <h4>
                {reservation_time} - {last_name}, {first_name}
            </h4>
            <p> Party: {people}</p>
        </div>
        <div>
            <h4 data-reservation-id-status={reservation_id}>
                Status: {status.toUpperCase()}
            </h4>
            <div>
                {status === "booked" && (
                    <>
                    <div>
                        <Link
                        to={`/reservations/${reservation_id}/seat`}
                        >
                            <i></i>Seat
                        </Link>
                        <Link
                        to={`/reservations/${reservation_id}/edit`}
                        >
                            <i></i>Edit
                        </Link>
                    </div>
                    <div>
                        <button
                            data-reservation-id-cancel={reservation_id}
                            onClick={cancelRes}
                            >
                                <i></i>Cancel
                            </button>
                    </div>
                    </>
                )}
            </div>
        </div>
    </div>
    )
}


export default ReservationList;