import React from "react";

function ReservationForm({handleChange, handleSubmit, errors, errorMessage, formData, cancelHandler}) {
    return (
        <form name="reservation" onSubmit={(handleSubmit)}>
            {errors.length ? errorMessage : null}
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            required
                            placeholder="First Name"
                            onChange={handleChange}
                            value={formData.first_name}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            required
                            placeholder="Last Name"
                            onChange={handleChange}
                            value={formData.last_name}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="mobile_number">Mobile Number</label>
                        <input
                            id="mobile_number"
                            name="mobile_number"
                            type="text"
                            required
                            placeholder="###-###-####"
                            onChange={handleChange}
                            value={formData.mobile_number}
                            className="form-control"
                        />
                    </div>


                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="reservation_date">Reservation Date</label>
                        <input
                            id="reservation_date"
                            name="reservation_date"
                            type="date"
                            required
                            placeholder="YYYY-MM-DD"
                            pattern="\d{4}-\d{2}-\d{2}"
                            onChange={handleChange}
                            value={formData.reservation_date}
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="reservation_time">Reservation Time</label>
                        <input
                            id="reservation_time"
                            name="reservation_time"
                            type="time"
                            required
                            placeholder="HH:MM"
                            pattern="[0-9]{2}:[0-9]{2}"
                            onChange={handleChange}
                            value={formData.reservation_time}
                            className="form-control"
                        />
                    </div>
                    <div className="col">

                        <label htmlFor="people">People</label>
                        <input
                            id="people"
                            name="people"
                            type="number"
                            min="1"
                            step="1"
                            placeholder={formData.people}
                            onChange={handleChange}
                            value={formData.people}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
            </div>
            <button className="btn btn-danger mr-2" type="cancel" onClick={cancelHandler}>Cancel</button>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
}

export default ReservationForm;