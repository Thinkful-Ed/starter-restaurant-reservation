import React, { useEffect, useState } from "react";
import { createReservation } from "../utils/api";
import { useLocation, useHistory } from "react-router-dom";


export default function NewReservation() {
    const history = useHistory();
    let location = useLocation();
    let query = new URLSearchParams(location.search);

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
        
        async function callCreateReservation() {
            try{
                const reservationInfo = await createReservation(reservation);
                query.set('date', `${formData.reservation_date}`);
                history.push(`/dashboard?date=${formData.reservation_date}`)
            }
            catch (error) {
                throw error
            }
        }
        callCreateReservation();
    };

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }

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
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                            <button type="cancel" onClick={goBack}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )






}
