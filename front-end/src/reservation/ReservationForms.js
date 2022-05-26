function ReservationForms({ form, handleChange, handleSubmit, handleCancel }) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            name="first_name"
            id="first_name"
            className="form-control"
            value={form.first_name}
            onChange={handleChange}
            required={true}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            name="last_name"
            id="last_name"
            className="form-control"
            value={form.last_name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            name="mobile_number"
            id="mobile_number"
            className="form-control"
            value={form.mobile_number}
            onChange={handleChange}
            placeholder="123-456-7890"
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">Date</label>
          <input
            name="reservation_date"
            id="reservation_date"
            value={form.reservation_date}
            onChange={handleChange}
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">Time</label>
          <input
            name="reservation_time"
            id="reservation_time"
            value={form.reservation_time}
            onChange={handleChange}
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">Party Size</label>
          <input
            name="people"
            id="people"
            type="number"
            value={form.people}
            onChange={handleChange}
            min={1}
            required={true}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    );
  }
  
  export default ReservationForms;