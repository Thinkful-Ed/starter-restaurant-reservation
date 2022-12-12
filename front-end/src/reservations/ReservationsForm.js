import React from "react";
import { useHistory } from "react-router";
const ReservationsForm = ({ formData, changeHandler, submitHandler }) => {
    const history = useHistory()
    const goHome = () => {
        history.push("/")
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="first_name">
                    First Name:
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        onChange={changeHandler}
                        value={formData.first_name}
                        required
                    />

                </label>
            </div>
            <label htmlFor="last_name">
                Last Name:
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    onChange={changeHandler}
                    value={formData.last_name}
                    required
                />
            </label>
            <label htmlFor="mobile_number">
                Mobile Number:
                <input
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    onChange={changeHandler}
                    value={formData.mobile_number}
                    required
                />
            </label>
            <label htmlFor="reservation_date">
                Reservation Date:
                <input
                    id="reservation_date"
                    type="date"
                    name="reservation_date"
                    onChange={changeHandler}
                    value={formData.reservation_date}
                    required
                />
            </label>
            <label htmlFor="reservaition_time">
                Reservation Time:
                <input
                    id="reservation_time"
                    type="time"
                    name="reservation_time"
                    onChange={changeHandler}
                    value={formData.reservation_time}
                    required
                />
            </label>
            <label htmlFor="people">
                People:
                <input
                    id="people"
                    type="text"
                    name="people"
                    onChange={changeHandler}
                    value={formData.people}
                    required
                />
            </label>
            <button type="submit" className="btn-btn primary">Submit</button>
            <button onClick={goHome}>Cancel</button>
        </form>
    )
}
export default ReservationsForm