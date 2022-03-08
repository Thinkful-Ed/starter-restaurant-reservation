import Input from "./Input";

export default function Form({
  inputs,
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  const inputList = inputs.map((input, key) => (
    <Input
      key={key}
      inputs={input}
      formData={formData}
      handleChange={handleChange}
    />
  ));
  return (
    <form className="d-flex flex-column h5" onSubmit={handleSubmit}>
      <div>{inputList}</div>
      <div className="mt-3">
        <button className="btn btn-primary mr-2" type="submit">
          Submit
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
