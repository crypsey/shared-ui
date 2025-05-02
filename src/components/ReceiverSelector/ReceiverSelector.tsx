import React, { useState } from "react";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import "./ReceiverSelector.css";

export type Receiver = {
  id: number;
  name: string;
  phone: string;
  country: string;
};

interface ContactSelectorProps {
  receivers: Receiver[];
  onAddReceiver?: () => void;
  onSelectReceiver?: (receiver: Receiver) => void;
  onEditReceiver?: (receiver: Receiver) => void;
  onDeleteReceiver?: (receiver: Receiver) => void;
}

const ContactSelector: React.FC<ContactSelectorProps> = ({
  receivers,
  onAddReceiver,
  onSelectReceiver,
  onEditReceiver,
  onDeleteReceiver,
}) => {
  // State to track which dropdown is currently open
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // New state to track the selected receiver
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(
    null
  );

  // Toggle dropdown menu
  const toggleDropdown = (contactId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === contactId ? null : contactId);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle edit action
  const handleEdit = (contact: Receiver, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditReceiver) {
      onEditReceiver(contact);
    }
    setOpenDropdownId(null);
  };

  // Handle delete action
  const handleDelete = (contact: Receiver, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteReceiver) {
      onDeleteReceiver(contact);
    }
    setOpenDropdownId(null);
  };

  // Handle receiver selection
  const handleSelectReceiver = (contact: Receiver) => {
    setSelectedReceiverId(contact.id);
    if (onSelectReceiver) {
      onSelectReceiver(contact);
    }
  };

  return (
    <div className="receiver-selector-container">
      <div className="receiver-selector-header">
        <h1 className="receiver-selector-title">Who are you sending to?</h1>

        {/* Add new receiver button */}
        <button className="add-receiver-button" onClick={onAddReceiver}>
          <div className="add-icon-wrapper">
            <Plus className="add-icon" size={20} />
          </div>
          <span className="add-text">Add receiver</span>
        </button>

        {/* Section title */}
        <div>
          <h2 className="section-title">Saved Receivers</h2>
        </div>

        {/* Saved contacts list */}
        <div className="contacts-list">
          {receivers.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item ${selectedReceiverId === contact.id ? "selected" : ""}`}
              onClick={() => handleSelectReceiver(contact)}
            >
              <div className="contact-info">
                <div className="flag-container">
                  {contact.country === "CA" && (
                    <div className="canadian-flag">
                      <div className="flag-red"></div>
                      <div className="flag-white"></div>
                      <div className="maple-leaf">
                        <svg
                          viewBox="0 0 50 50"
                          fill="currentColor"
                          width="16"
                          height="16"
                        >
                          <path d="M25,0 L30,20 L50,20 L35,32 L42,50 L25,38 L8,50 L15,32 L0,20 L20,20 Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="contact-details">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-phone">{contact.phone}</div>
                </div>
              </div>
              <div className="more-options-container">
                <button
                  className="more-button"
                  aria-label="More options"
                  onClick={(e) => toggleDropdown(contact.id, e)}
                >
                  <MoreVertical size={20} />
                </button>

                {/* Dropdown menu */}
                {openDropdownId === contact.id && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={(e) => handleEdit(contact, e)}
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={(e) => handleDelete(contact, e)}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactSelector;
