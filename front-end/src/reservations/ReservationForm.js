import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationForm({ formData, handleSubmit, handleChange, error }) {
    let history = useHistory();
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input required name="first_name" type="text" className="form-control" value={formData.first_name} placeholder="First Name" onChange={handleChange} />
                <label htmlFor="last_name">First Name</label>
                <input required name="last_name" type="text" className="form-control" value={formData.last_name} placeholder="Last Name" onChange={handleChange} />
                <label htmlFor="mobile_number">Mobile Phone</label>
                <input required name="mobile_number" type="text" className="form-control" value={formData.mobile_number} placeholder="555-555-5555" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_date">Date</label>
                <input required name="reservation_date" type="date" className="form-control" value={formData.reservation_date} onChange={handleChange}/>
                <label htmlFor="reservation_time">Time</label>
                <input required name="reservation_time" type="time" className="form-control" value={formData.reservation_time} onChange={handleChange}/>
                <label htmlFor="people">Number of People:</label>
                <input required name="people" type="number" className="form-control" value={formData.people} onChange={handleChange} min="1"/>
            </div>
            { error ? <button type="submit" className="btn btn-primary mr-2" disabled>Submit</button> : <button type="submit" className="btn btn-primary mr-2">Submit</button>}
            <button className="btn btn-secondary" type="button" onClick={() => history.goBack()}>Cancel</button>
        </form>
    )
}