import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 1234 },
    { name: "Asterius", number: 34 },
    { name: "Pan", number: 124 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [filteredPeople, setFiltredPeople] = useState(persons);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    let filterLength = event.target.value.length;

    const newArray = persons.filter(
      (person) =>
        person.name.substring(0, filterLength).toUpperCase() ===
        event.target.value.toUpperCase()
    );

    setFiltredPeople(newArray);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) return;

    let exists = false;

    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${newName} already exists.`);
        exists = true;
      }
    });

    if (exists) return;

    let newPersons = persons.concat({ name: newName, number: newNumber });

    setPersons(newPersons);
    setFiltredPeople(newPersons);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Search</h2>

      <p>Filter Name</p>
      <input type="text" value={filter} onChange={handleFilterChange} />

      <h2>Phonebook</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number:{" "}
          <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {filteredPeople.map((person) => (
        <p key={person.number}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
