import React from "react"


function Form({handleSubmit, handleFirstNameChange, handleLastNameChange, handleMobileNumberChange, firstName, lastName, mobileNumber}){
    return (
        <form onSubmit = {handleSubmit}>
            <div>
                <label htmlFor="first_name">
                    First Name
                </label>
                <input 
                name = "first_name"
                id = "first_name"
                className = "form-control"
                onChange={handleFirstNameChange}
                value={firstName}
                required
                />
            </div>
            <div>
                <label htmlFor="last_name">
                    Last Name
                </label>
                <input 
                name = "last_name"
                id = "last_name"
                className = "form-control"
                onChange={handleLastNameChange}
                value={lastName}
                required
                />
            </div>
            <div>
                <label htmlFor="mobile_number">
                    Mobile Number
                </label>
                <input
                name = "mobile_number"
                id = "mobile_number"
                className = "form-control"
                onChange={handleMobileNumberChange}
                value={mobileNumber}
                required
                />
            </div>
            <div>
                <label htmlFor="reservation_date">
                    Date
                </label>
                <input type="date"
                name = "reservation_date"
                id = "reservation_date"
                className = "form-control"
                required
                />
            </div>
            <div>
                <label htmlFor="reservation_time">
                    Time
                </label>
                <input type="time"
                name = "reservation_time"
                id = "reservation_time"
                className = "form-control"
                required
                />
            </div>
            <div>
                <label htmlFor="people">
                    Number of people in the party
                </label>
                <input type="number"
                name = "people"
                id = "people"
                className = "form-control"
                required
                />
            </div>
            <button type="submit">Submit</button>
            <button type="cancel">Cancel</button>
        </form>
    )
}

export default Form