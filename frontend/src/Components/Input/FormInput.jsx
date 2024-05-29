
export const FormInput = ({ label, ...otherProps }) => {
  const { value } = otherProps;

  const shrinkClass =
    value && typeof value === "string" && value.length ? "shrink" : "";

  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label className={`${shrinkClass} form-input-label`}>{label}</label>
      )}
    </div>
  );
};

