export default function SelectForm({
  id,
  name,
  required,
  formData,
  handleChange,
  optionsList,
}) {
  return (
    <select
      id={id}
      name={name}
      size={1}
      required={required}
      onChange={handleChange}
      value={formData[name]}
    >
      <option value="">-- Select a {id.split("_").join(" ")} --</option>
      {optionsList}
    </select>
  );
}
