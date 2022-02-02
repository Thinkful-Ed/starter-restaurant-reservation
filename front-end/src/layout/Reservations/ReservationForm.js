import React from 'react'
import {useHistory} from "react-router-dom"
import ErrorAlert from './../ErrorAlert'
function ReservationForm({handleSubmission,handleChange,handleNumberChange,form,error}) {
    const history = useHistory()
    return (
        <form onSubmit={handleSubmission}>
            <ErrorAlert error={error}/>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label"  >First Name</label>
                <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Mobile Number</label>
                <input type="text" className="form-control" id="mobile_number" name="mobile_number"placeholder="Mobile Number"  value={form.mobile_number} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Date</label>
                <input type="date" className="form-control" id="reservation_date" name="reservation_date"value={form.reservation_date} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Time</label>
                <input type="time" className="form-control" id="reservation_time" name="reservation_time" value={form.reservation_time} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">People</label>
                <input type="number" className="form-control" id="people" name="people"value={form.people} onChange={handleNumberChange} min={1} required/>
            </div>
            <div style={{display:"flex"}}>
            <button onClick={(e)=>{
                e.preventDefault()
                history.goBack()}}
                className="btn btn-danger mr-3"
                >Cancel</button>
            <button type="submit" className="btn btn-success">Submit</button>
            </div>
        </form>
    )
}

export default ReservationForm