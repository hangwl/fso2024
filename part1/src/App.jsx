// App.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ContactForm from "./components/ContactForm";
import ErrorMessage from "./components/ErrorMessage";
import ContactList from "./components/ContactList";
import phonebookService from "./services/phonebookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") setNewName(value);
    else if (name === "number") setNewNumber(value);
    else if (name === "search") setSearchTerm(value);
  };

  const addOrUpdatePerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        setErrorMessage(`${newName} already exists in the phonebook.`);
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
            setErrorMessage(null);
          })
          .catch((error) => {
            console.error("Error updating contact:", error);
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
          setErrorMessage(null);
        })
        .catch((error) => {
          console.error("Error adding new contact:", error);
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
      <ErrorMessage errorMessage={errorMessage} />
      <h3>Numbers</h3>
      <ContactList filteredPersons={filteredPersons} setPersons={setPersons} />
    </div>
  );
};

export default App;
