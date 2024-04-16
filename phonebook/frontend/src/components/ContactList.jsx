import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import phonebookService from "../services/phonebookService";
import useTimeout from "../hooks/useTimeout";

const ContactList = ({ filteredPersons, setPersons }) => {
  const [notification, setNotification] = useState({ message: "", type: "" });

  const { startTimeout, stopTimeout } = useTimeout(() => {
    setNotification({ message: "", type: "" });
  }, 5000);

  useEffect(() => {
    if (notification.message !== "") {
      startTimeout();
    } else {
      stopTimeout();
    }
  }, [notification, startTimeout, stopTimeout]);

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
          setNotification({
            message: `${name} removed successfully.`,
            type: "success",
          });
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          setNotification({
            message: `Error deleting '${name}' contact. Please refresh the page and try again.`,
            type: "error",
          });
        });
    }
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
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
