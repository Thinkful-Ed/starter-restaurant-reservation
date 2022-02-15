import { useEffect, useState } from "react"
const { listReservations, createReservation } = require("../utils/api")

export default function NewReservation() {

    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [formData, setFormData] = useState({ ...initialFormData })

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const handleReset = () => {
        setFormData({ ...initialFormData })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        console.log("Submitted form with data:", formData)
        const abortController = new AbortController()
        const newReservation = { ...formData }
        console.log("new reservation inside handlesubmit", newReservation)
        const response = await createReservation(newReservation, abortController.signal)
        console.log("response in handleSubmit", response)
    }

    return (
        <form className="new-res-form" onSubmit={handleSubmit}>
            <h1>New Reservation</h1>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                    id="first_name"
                    className="form-control"
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={formData.first_name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                    id="last_name"
                    className="form-control"
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={formData.last_name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input 
                    id="mobile_number"
                    className="form-control"
                    type="text"
                    name="mobile_number"
                    onChange={handleChange}
                    value={formData.mobile_number}
                />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_date">Date</label>
                <input 
                    id="reservation_date"
                    className="form-control"
                    type="date"
                    name="reservation_date"
                    onChange={handleChange}
                    value={formData.reservation_date}
                />
            </div>
            <div className="form-group">
               <label htmlFor="reservation_time">Time</label>
               <input
                    id="reservation_time"
                    className="form-control"
                    type="time"
                    name="reservation_time"
                    onChange={handleChange}
                    value={formData.reservation_time}
                />
            </div>
            <div className="form-group">
                <label htmlFor="people">Party Size</label>
                <input 
                    id="people"
                    className="form-control"
                    type="number"
                    name="people"
                    onChange={handleChange}
                    value={formData.people}
                />
            </div>
            <label htmlFor="submit">
                <input 
                    type="submit"
                    id="submit"
                    name="submit"
                />
            </label>
            <label htmlFor="reset">
                <input 
                    type="reset"
                    id="reset"
                    name="reset"
                    onClick={handleReset}
                />
            </label>
        </form>
    )

}