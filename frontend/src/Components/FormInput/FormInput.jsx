import "./style.scss";

export const FormInput = ({ label, errorFields, ...otherProps }) => {
  const { value } = otherProps;

  const errorStyle = errorFields && errorFields.includes(otherProps.name);
  const shrinkClass =
    value && typeof value === "string" && value.length ? "shrink" : "";

  return (
    <div className="group">
      <input
        className={`form-input ${errorStyle ? "error" : ""}`}
        {...otherProps}
      />
      {label && (
        <label className={`${shrinkClass} form-input-label`}>{label}</label>
      )}
    </div>
  );
};
