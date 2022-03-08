export default function InputForm({
  type = "text",
  id,
  name,
  min = "0",
  minLength = "0",
  required = false,
  placeholder = "",
  formData,
  handleChange,
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className="mb-3 form-control"
      onChange={handleChange}
      value={formData[name]}
      min={min}
      minLength={minLength}
      required={required}
      placeholder={placeholder}
    />
  );
}
