import { Link } from "react-router-dom";


const NewReservation = () => {
  return (
    <form>
      <label htmlFor="name">First Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        //value
        aria-describedby="emailHelp"
        placeholder="First Name"
        onChange
      ></input>
      <label htmlFor="description">Last Name</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        //value
        aria-describedby="emailHelp"
        placeholder="Last Name"
        onChange
      ></input>
      <label htmlFor="description">Mobile Number</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        //value
        aria-describedby="emailHelp"
        placeholder="Mobile Number"
        onChange
      ></input>
      <label htmlFor="description">Reservation Date</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        //value
        aria-describedby="emailHelp"
        placeholder="Reservation Date"
        onChange
      ></input>
      <label htmlFor="description">Reservation Time</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        //value
        aria-describedby="emailHelp"
        placeholder="Reservation Time"
        onChange
      ></input>
      <label htmlFor="description">Number of People</label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        //value
        aria-describedby="emailHelp"
        placeholder="Number of People"
        onChange
      ></input>
      <Link to="/" type="button" className="btn btn-secondary">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default NewReservation;
