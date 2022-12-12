import React from "react";

function MapReservations({ reservations }) {

    console.log(reservations)
    let formatedReservations = reservations.map((reservation, index)=> (
            <section className="card" key={index} >
                <div className="d-flex">
                    <p>{reservation.first_name}</p>
                    <p>{reservation.last_name}</p> 
                </div> 
                <p>{reservation.mobile_number}</p>
                <p>{reservation.reservation_date}</p>
                <p>{reservation.reservation_time}</p>
                <p>{reservation.people}</p>
            </section>
    ))

    return (
        <div>
            {formatedReservations}
        </div>

    )

}

export default MapReservations