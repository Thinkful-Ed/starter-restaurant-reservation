import React from "react"
import { useHistory } from "react-router-dom"


function ReservationForm({handleSubmit, handleChange, reservationForm, noPastDate}){
    const history = useHistory()


    return (
        <>
        <h2>
            Create a reservation
        </h2>
        <form onSubmit = {handleSubmit}>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div>
                            <label htmlFor="first_name">
                                    First Name
                                </label>
                                <input 
                                name = "first_name"
                                id = "first_name"
                                className = "form-control"
                                onChange={handleChange}
                                value={reservationForm.first_name}
                                required
                                />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div>
                        <label htmlFor="last_name">
                            Last Name
                        </label>
                        <input 
                        name = "last_name"
                        id = "last_name"
                        className = "form-control"
                        onChange={handleChange}
                        value={reservationForm.last_name}
                        required
                        />
                        </div>
                    </div>  
                    <div className="col-sm">
                        <div>
                            <label htmlFor="mobile_number">
                                Mobile Number
                            </label>
                            <input
                            name = "mobile_number"
                            id = "mobile_number"
                            className = "form-control"
                            onChange={handleChange}
                            value={reservationForm.mobile_number}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <div>
                            <label htmlFor="reservation_date">
                                Date
                            </label>
                            <input 
                            type="date"
                            name = "reservation_date"
                            id = "reservation_date"
                            className = "form-control"
                            onChange={handleChange}
                            value={reservationForm.reservation_date}
                            required
                            // min={noPastDate()}
                            
                            />
                        </div>
                    </div>
                    <div className="col-sm">
                    <div>
                        <label htmlFor="reservation_time">
                            Time
                        </label>
                        <input type="time"
                        name = "reservation_time"
                        id = "reservation_time"
                        className = "form-control"
                        onChange={handleChange}
                        value={reservationForm.reservation_time}
                        required
                        />
                    </div>
                </div>
                <div className="col-sm">
                    <div>
                        <label htmlFor="people">
                            Number of people in the party
                        </label>
                        <input type="number"
                        name = "people"
                        id = "people"
                        className = "form-control"
                        onChange={handleChange}
                        value={reservationForm.people}
                        required
                        min="1"
                        />
                    </div>
                </div>
                </div> 
            <div className="row">
                <div className="col-sm">
                    <button type="button" className="btn btn-secondary" onClick={()=> history.push("/")}>Cancel</button>
                    <button type="submit" className="btn btn-primary" value="submit">Submit</button>
                </div>
                
            </div>

            </div>
            
            
            
            
            
            
        </form>
        </>
    )
}

export default ReservationForm