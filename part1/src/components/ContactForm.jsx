import React from "react";

const ContactForm = ({
  newName,
  newNumber,
  handleInputChange,
  addOrUpdatePerson,
}) => (
  <form onSubmit={addOrUpdatePerson}>
    <div>
      Name:{" "}
      <input
        type="text"
        name="name"
        value={newName}
        onChange={handleInputChange}
      />
    </div>
    <div>
      Number:{" "}
      <input
        type="text"
        name="number"
        value={newNumber}
        onChange={handleInputChange}
      />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

export default ContactForm;
