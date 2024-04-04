import React, { useState } from "react";
import phonebookService from "../services/phonebookService";

const ContactList = ({ filteredPersons, setPersons }) => {
  const [removeSuccessMessage, setRemoveSuccessMessage] = useState("");
  const [removeErrorMessage, setRemoveErrorMessage] = useState("");

  const handleDelete = (id, name) => {
    const personToDelete = filteredPersons.find((person) => person.id === id);

    if (!personToDelete) {
      console.error("Error: Person to delete not found");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${personToDelete.name}?`
    );

    if (confirmDelete) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          setRemoveSuccessMessage(`${name} removed successfully.`);
          setRemoveErrorMessage("");
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          setRemoveSuccessMessage("");
          setRemoveErrorMessage(`Error deleting '${name}' contact. Please refresh the page and try again.`);
        });
    }
  };

  return (
    <div>
      {removeSuccessMessage && (
        <div style={{ color: "green" }}>{removeSuccessMessage}</div>
      )}
      {removeErrorMessage && (
        <div style={{ color: "red" }}>{removeErrorMessage}</div>
      )}
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
