import React from "react"

function Reservation({reservation}){
 const{first_name, last_name, mobile_number, reservation_time, people} = reservation;

    return(
        <div className = "card">
            <div className = "card-body">
                <h5 className="card-title">
                    Reservation for: {first_name} {last_name}
                </h5>
                <p className="card-text">Phone number: {mobile_number}</p>
                <p className="card-text">Time: {reservation_time}</p>
                <p className="card-text">Party size: {people}</p>
            </div>
        </div>
    )
}

export default Reservation