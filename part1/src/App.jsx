import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ContactForm } from "./components/ContactForm";
import { ErrorMessage } from "./components/ErrorMessage";
import { ContactList } from "./components/ContactList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "12345678", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [nextId, setNextId] = useState(2);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const isNameExists = persons.some((person) => person.name === newName);

    if (isNameExists) {
      setErrorMessage(`${newName} already exists in the phonebook.`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: nextId,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
    setErrorMessage(null);
    setNextId(nextId + 1);
  };

  const filteredPersons = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <h3>New Contact</h3>
      <ContactForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <h3>Numbers</h3>
      <ContactList filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
