function SearchForm({ mobile_number, handleChange, searchFormHandler }) {
  return (
    <form onSubmit={searchFormHandler}>
      <h1>Search Reservations</h1>
      <div className="form-search col-4">
        <label className="form-label">Mobile Number</label>
        <input
          type="string"
          className="form-control"
          id="search-mobile-number"
          name="mobile_number"
          onChange={handleChange}
          value={mobile_number}
          placeholder="Enter a reservation's phone number"
        ></input>
      </div>
      <br></br>
      <button
        type="submit"
        className="btn-search-form-submit"
        onClick={searchFormHandler}
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
