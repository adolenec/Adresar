import "../layout/common.css";

const ContactTypeInput = ({
  contactType,
  onContactTypeChange,
  onContactTypeBlur,
  hasError,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={contactType.value}>{contactType.label}</label>
      <input
        id={contactType.value}
        type={contactType.value}
        onChange={onContactTypeChange}
        onBlur={onContactTypeBlur}
      />
      {hasError && <p className="error-msg">Please enter a valid contact</p>}
    </div>
  );
};

export default ContactTypeInput;
