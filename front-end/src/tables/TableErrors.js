function TableErrors({ errors }) {
  console.log("table errors called");
  if (errors !== null) {
    if (errors.length) {
      return (
        <div className="alert alert-danger">
          <p>error:</p>
          {errors.map((error) => (
            <p key={errors.indexOf(error)}>{error.message}</p>
          ))}
        </div>
      );
    }
  }
  return null;
}

export default TableErrors;
