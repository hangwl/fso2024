import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ContactForm from "./components/ContactForm";
import Notification from "./components/Notification";
import ContactList from "./components/ContactList";
import phonebookService from "./services/phonebookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    let timeoutId = null;
    let secondsLeft = 5;

    if (notification.message !== "") {
      timeoutId = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);

      const intervalId = setInterval(() => {
        console.log(`Timeout ${intervalId}: ${secondsLeft} seconds left`);
        secondsLeft--;

        if (secondsLeft === 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        clearInterval(intervalId);
      };
    }
  }, [notification]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setNewName(value);
    else if (name === "number") setNewNumber(value);
    else if (name === "search") setSearchTerm(value);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const addOrUpdatePerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        showNotification(
          `${newName} already exists in the phonebook.`,
          "error"
        );
        return;
      }

      const confirmReplace = window.confirm(
        `${newName} already exists in the phonebook. Do you want to replace the existing phone number?`
      );

      if (confirmReplace) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            showNotification("Contact updated successfully.", "success");
          })
          .catch((error) => {
            console.error("Error updating contact:", error);
            showNotification(
              "Error updating contact. Please try again.",
              "error"
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          showNotification("Contact added successfully.", "success");
        })
        .catch((error) => {
          console.error("Error adding new contact:", error);
          showNotification(
            "Error adding new contact. Please try again.",
            "error"
          );
        });
    }
  };

  const filteredPersons = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar searchTerm={searchTerm} handleSearch={handleInputChange} />
      <h3>New Contact</h3>
      <ContactForm
        newName={newName}
        newNumber={newNumber}
        handleInputChange={handleInputChange}
        addOrUpdatePerson={addOrUpdatePerson}
      />
      <Notification message={notification.message} type={notification.type} />
      <h3>Numbers</h3>
      <ContactList filteredPersons={filteredPersons} setPersons={setPersons} />
    </div>
  );
};

export default App;
