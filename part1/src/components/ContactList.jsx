import React from "react";

export const ContactList = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );
};
