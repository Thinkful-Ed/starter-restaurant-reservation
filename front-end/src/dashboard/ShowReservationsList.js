import React from "react";
import ShowReservation from "./ShowReservation";

function ShowReservationsList({ reservations = [] }){
    return (
        <table className="table table-striped">
            <thead>
                <tr className="bg-primary text-white">
                    <th >id#</th>
                    <th >First Name</th>
                    <th >Last Name</th>
                    <th >Phone</th>
                    <th >Date</th>
                    <th >Time</th>
                    <th >Party</th>
                    <th >Action</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation, index) => <ShowReservation key={index.toString()} reservation={reservation} index={index}/> )}
            </tbody>
        </table>
    );
}

export default ShowReservationsList;