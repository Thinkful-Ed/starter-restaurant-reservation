import React from "react"
import { useHistory, Link } from "react-router-dom"
import axios from "axios"

export default function ReservationCard({ reservation }) {
    const URL = process.env.REACT_APP_API_BASE_URL
    const history = useHistory()

    return (
        <tr>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
        </tr>
    )

}