import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
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
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setErrorMessage(null);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
