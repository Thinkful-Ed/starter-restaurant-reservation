import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Reservations({ date }){
    return (<>
        <div>
            <form>
                <label>First Name:</label>
                <input
                name="first_name"
                required/>
                <label>Last Name:</label>
                <input
                name="last_name"
                required/>
                <label>Mobile Number:</label>
                <input
                name="mobile_number"
                required/>
                <label>Date of Reservation:</label>
                <input
                name="reservation_date"
                required/>
                <label>Time of Reservation:</label>
                <input
                name="reservation_time"
                required/>
                <label>Number of people in the party:</label>
                <input
                name="people"
                required/>
                <button>Submit</button>
                <button>Cancel</button>
            </form>
        </div>
    </>)
}