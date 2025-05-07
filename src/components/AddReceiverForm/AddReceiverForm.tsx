import React, { useState, ReactNode } from "react";
import "./AddReceiverForm.css";

export interface ReceiverFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileCountryCode: string;
  mobileNumber: string;
  city: string;
  reasonForSending: string;
}

interface AddReceiverFormProps {
  onSave?: (receiverData: ReceiverFormData) => void;
  onCancel?: () => void;
  receiveDetailsSections?: ReactNode;
}

const AddReceiverForm: React.FC<AddReceiverFormProps> = ({
  onSave,
  onCancel,
  receiveDetailsSections,
}) => {
  const [formData, setFormData] = useState<ReceiverFormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobileCountryCode: "250", // Default code
    mobileNumber: "",
    city: "",
    reasonForSending: "",
  });

  const [reasonDropdownOpen, setReasonDropdownOpen] = useState(false);

  const reasons = [
    "Family Support",
    "Business Transaction",
    "Education",
    "Medical Expenses",
    "Gift",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReasonSelect = (reason: string) => {
    setFormData((prev) => ({
      ...prev,
      reasonForSending: reason,
    }));
    setReasonDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  const getCharCount = (field: string) => {
    return formData[field as keyof ReceiverFormData]?.length || 0;
  };

  return (
    <div className="add-receiver-container">
      <h1 className="add-receiver-title">Add new receiver</h1>

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="optional-label">First Name</div>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First name"
            className="form-control"
            maxLength={40}
          />
          <div className="character-count">{getCharCount("firstName")}/40</div>
        </div>

        {/* Last Name */}
        <div className="optional-label">Last Name</div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last name"
            className="form-control"
            maxLength={40}
          />
          <div className="character-count">{getCharCount("lastName")}/40</div>
        </div>

        {/* Email */}
        <div className="optional-label">Email</div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Last name"
            className="form-control"
            maxLength={40}
          />
          <div className="character-count">{getCharCount("email")}/40</div>
        </div>

        {/* Mobile Account Details Section (Dynamic) */}
        {receiveDetailsSections ? (
          receiveDetailsSections
        ) : (
          <>
            <div className="section-header">MOBILE ACCOUNT DETAILS</div>
            <div className="form-group mobile-group">
              <div className="country-code">
                <input
                  type="text"
                  name="mobileCountryCode"
                  value={formData.mobileCountryCode}
                  onChange={handleInputChange}
                  className="country-code-input"
                  readOnly
                />
              </div>
              <div className="mobile-number-container">
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="MTN mobile money"
                  className="form-control mobile-input"
                  maxLength={9}
                />
                <div className="character-count">
                  {getCharCount("mobileNumber")}/9
                </div>
              </div>
            </div>
          </>
        )}

        {/* Receiver's Address Section */}
        <div className="optional-label">RECEIVER'S ADDRESS</div>

        <div className="form-group">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City/State"
            className="form-control"
            maxLength={40}
          />
          <div className="character-count">{getCharCount("city")}/40</div>
        </div>

        {/* Reason For Sending Section */}
        <div className="optional-label">REASON FOR SENDING</div>

        <div className="form-group">
          <div className="dropdown-container">
            <div
              className="dropdown-select"
              onClick={() => setReasonDropdownOpen(!reasonDropdownOpen)}
            >
              <span className={formData.reasonForSending ? "has-value" : ""}>
                {formData.reasonForSending || "Reason for sending"}
              </span>
              <span className="dropdown-arrow">&#9662;</span>
            </div>

            {reasonDropdownOpen && (
              <div className="dropdown-menu">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className="dropdown-item"
                    onClick={() => handleReasonSelect(reason)}
                  >
                    {reason}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="button-group">
          <button type="submit" className="submit-button">
            Save and continue
          </button>
          {onCancel && (
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddReceiverForm;
