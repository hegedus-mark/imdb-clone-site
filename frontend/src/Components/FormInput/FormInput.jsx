import "./style.scss";

export const FormInput = ({ label, error, ...otherProps }) => {
  const { value } = otherProps;

  if (error) {
    console.log("error received,", error);
  }

  const shrinkClass =
    value && typeof value === "string" && value.length ? "shrink" : "";

  return (
    <div className="group">
      <input className={`form-input ${error ? "error" : ""}`} {...otherProps} />
      {error && <span className="error-message">{error}</span>}
      {label && (
        <label className={`${shrinkClass} form-input-label`}>{label}</label>
      )}
    </div>
  );
};
