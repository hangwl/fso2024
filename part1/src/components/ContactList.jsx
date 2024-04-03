import React from "react";
import phonebookService from "../services/phonebookService";

const ContactList = ({ filteredPersons, setPersons }) => {
  const handleDelete = (id) => {
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
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
        });
    }
  };

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
