export default function InputForm({
  type,
  id,
  name,
  min,
  minLength,
  required,
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
    />
  );
}
