import React from "react";



export default function ReservationForm({handleSubmit, handleChange, formData, goBack}) {


    return(
    <form onSubmit={handleSubmit}>
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