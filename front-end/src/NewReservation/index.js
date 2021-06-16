function NewReservation() {
  return (
    <div className="conatiner">
      <h4>Make a reservation</h4>
      <form>
        <div className="row g-2">
          <div className="col-md">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="first_name"
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          {/* Form input */}
          <div className="col-md">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
          {/* Form input */}
        </div>
        {/* Form Group */}
        <div className="row g-2">
          <div className="col-md">
            <label htmlFor="last_name">Mobile number</label>
            <input
              type="text"
              className="form-control"
              name="mobile_number"
              placeholder="Mobile number"
              aria-label="Mobile number"
            />
          </div>
          {/* Form input */}
          <div className="col-md">
            <label htmlFor="people">Number of people</label>
            <input
              type="text"
              className="form-control"
              name="people"
              placeholder="Number of people"
              aria-label="Number of people"
              defaultValue="1"
            />
          </div>
          {/* Form input */}
        </div>
        {/* Form Group */}
        <div className="row g-2">
          <div className="col-md">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              className="form-control"
              name="reservation_date"
              placeholder="YYYY-MM-DD"
              aria-label="Reservation date"
            />
          </div>
          {/* Form input */}
          <div className="col-md">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              type="time"
              pattern="[0-9]{2}:[0-9]{2}"
              className="form-control"
              name="reservation_time"
              placeholder="HH:MM"
              aria-label="Reservation date"
              aria-describedby="passwordHelpBlock"
            />
          </div>
          {/* Form input */}
        </div>
        {/* Form Group */}
        <div className="d-flex">
          <button type="submit" className="btn btn-primary ml-1 mt-2">
            Submit
          </button>
          <button type="submit" className="btn btn-danger ml-1 mt-2">
            Cancel
          </button>
        </div>
        {/* Button Group */}
      </form>
    </div>

    /* Container */
  );
}
export default NewReservation;
