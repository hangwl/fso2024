import React, { useState, useEffect } from "react";
import Notification from "./Notification"; // Import Notification component
import phonebookService from "../services/phonebookService";

const ContactList = ({ filteredPersons, setPersons }) => {
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    let timeoutId = null;
    let secondsLeft = 5; // Move the declaration outside the if block

    if (notification.message !== "") {
      timeoutId = setInterval(() => {
        console.log(`Timeout ${timeoutId}: ${secondsLeft} seconds left`);
        secondsLeft--;

        if (secondsLeft === 0) {
          clearInterval(timeoutId);
          setNotification({ message: "", type: "" });
        }
      }, 1000);

      // Clean up the timeout when the component unmounts or when a new notification is set
      return () => {
        if (timeoutId) {
          clearInterval(timeoutId);
        }
      };
    }
  }, [notification]); // Trigger effect whenever notification changes

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
          setNotification({ message: `${name} removed successfully.`, type: "success" });
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          setNotification({ message: `Error deleting '${name}' contact. Please refresh the page and try again.`, type: "error" });
        });
    }
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} /> {/* Display notification */}
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
