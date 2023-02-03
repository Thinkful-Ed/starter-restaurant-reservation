import React, { useEffect, useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router";


export default function NewReservation() {
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = ({ target }) => {
        setFormData({...formData, [target.name]:target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        formData.people = Number(formData.people);
        const reservation = formData;
        
        console.log(typeof(formData.people))
        async function callCreateReservation() {
            try{
                const reservationInfo = await createReservation(reservation);
                history.push(`/reservations?date=${reservationInfo.reservation_date}`);
            }
            catch (error) {
                throw error
            }
        }
        callCreateReservation();
    };

    return (
        <form name="create" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                onChange={handleChange}
                                value={formData.first_name}
                                placeholder="First Name"
                                />
                        </td>

                        <td>
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                onChange={handleChange}
                                value={formData.last_name}
                                placeholder="Last Name"
                                />
                        </td>

                        <td>
                            <input
                                id="mobile_number"
                                name="mobile_number"
                                type="text"
                                onChange={handleChange}
                                value={formData.mobile_number}
                                placeholder="Mobile Number"
                                />
                        </td>

                        <td>
                            <input
                                id="reservaion_date"
                                name="reservation_date"
                                type="date"
                                onChange={handleChange}
                                value={formData.reservation_date}
                                placeholder="YYYY-MM-DD"
                                pattern="\d{4}-\d{2}-\d{2}"
                                />
                        </td>

                        <td>
                            <input
                                id="reservation_time"
                                name="reservation_time"
                                type="time"
                                onChange={handleChange}
                                value={formData.reservation_time}
                                placeholder="HH:MM"
                                pattern="[0-9]{2}:[0-9]{2}"
                                />
                        </td>

                        <td>
                            <input
                                id="people"
                                name="people"
                                type="number"
                                min="1"
                                onChange={handleChange}
                                value={formData.people}
                                placeholder="Number of people"
                                />
                        </td>
                        <td>
                            <button type="submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )






}
