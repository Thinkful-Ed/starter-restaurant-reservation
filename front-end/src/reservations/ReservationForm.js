

function ReservationForm(inputData, changeHandler, submitHandler, cancelHandler){
    return(
        <form>
        <label htmlFor="first_name">
          First name
          <input
            name="first_name"
            id="last_name"
            type="text"
            onChange={changeHandler}
            value={inputData.first_name}
            required
          />
        </label>
        <br />
        <label htmlFor="last_name">
          Last name
          <input
            name="last_name"
            id="last_name"
            type="text"
            onChange={changeHandler}
            value={inputData.last_name}
            required
          />
        </label>
        <br />
        <label htmlFor="mobile_number">
          Mobile number
          <input
            name="mobile_number"
            id="mobile_number"
            type="text"
            onChange={changeHandler}
            value={inputData.mobile_number}
            required
          />
        </label>
        <br />
        <label htmlFor="reservation_date">
          Reservation date
          <input
            name="reservation_date"
            id="reservation_date"
            type="date"
            onChange={changeHandler}
            value={inputData.reservation_date}
            required
          />
        </label>
        <br />
        <label htmlFor="reservation_time">
          Reservation time
          <input
            name="reservation_time"
            id="reservation_time"
            type="time"
            onChange={changeHandler}
            value={inputData.reservation_time}
            required
          />
        </label>
        <br />
        <label htmlFor="people">
          Number of guests
          <input
            name="people"
            type="number"
            onChange={changeHandler}
            value={inputData.people}
            required
          />
        </label>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={submitHandler}
          >
            Submit
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    )
}

export default ReservationForm;