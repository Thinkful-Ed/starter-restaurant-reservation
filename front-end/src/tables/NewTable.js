function NewTable() {
  return (
    <>
      <h1 className="mb-5">New Table</h1>
      <div className="d-flex justify-content-center">
        <form>
            <div className="col-5">
            <label>Table Name</label>
            <input
              type="text"
              id="table_name"
              name="table_name"
              required={true}
            ></input>
         </div>
         <div className="mt-3 col-5">
            <label>Capacity</label>
            <input
              type="number"
              id="capacity"
              name="table_name"
              required={true}
              min="1"
            ></input>
            </div>
        </form>
      </div>
    </>
  );
}
export default NewTable;
