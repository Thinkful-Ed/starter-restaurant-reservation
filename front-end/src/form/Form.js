import Input from "./Input";

export default function Form({
  inputs,
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  const inputList = inputs.map(
    ({
      type,
      id,
      name,
      options = null,
      required = false,
      min = "0",
      minLength = "0",
    }, key) => (
      <Input
        key={key}
        type={type}
        id={id}
        name={name}
        options={options}
        required={required}
        min={min}
        minLength={minLength}
        formData={formData}
        handleChange={handleChange}
      />
    )
  );
  return (
    <form className="d-flex flex-column h5" onSubmit={handleSubmit}>
      <div>{inputList}</div>
      <div className="mt-3">
        <button className="btn btn-primary mr-2" type="submit">
          Submit
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
