import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Add from "./components/Add";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";
import {
  addNumber,
  deleteNumber,
  getAll,
  replaceNumber,
} from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [filteredPeople, setFiltredPeople] = useState(persons);
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState({
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  });

  useEffect(() => {
    getAll().then((allPeople) => {
      setPersons(allPeople);
      setFiltredPeople(allPeople);
    });
  }, []);

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
        exists = true;

        if (
          window.confirm(
            `${newName} already exists, replace the old number with a new one?`
          )
        ) {
          const changedNumber = { ...person, number: newNumber };

          replaceNumber(person.id, changedNumber)
            .then((changedNumber) => {
              setStyle({
                ...style,
                color: "green",
              });
              const newPeople = persons.map((person) => {
                if (person.name === newName) {
                  setMessage(`${newName} has been updated`);
                  setTimeout(() => {
                    setMessage("");
                  }, 3000);
                }
                return person.name !== newName ? person : changedNumber;
              });

              setPersons(newPeople);
              setFiltredPeople(newPeople);
            })
            .catch(() => {
              setMessage(`${changedNumber.name} has already been deleted`);
              setStyle({
                ...style,
                color: "red",
              });
              let newPeople = persons.filter(
                (person) => person.id !== changedNumber.id
              );

              setTimeout(() => {
                setMessage("");
              }, 3000);
              setPersons(newPeople);
              setFiltredPeople(newPeople);
            });
        }
      }
    });

    if (exists) {
      setNewName("");
      setNewNumber("");
      return;
    }

    addNumber({ name: newName, number: newNumber }).then((newPersons) => {
      setStyle({
        ...style,
        color: "green",
      });
      setPersons(persons.concat(newPersons));
      setFiltredPeople(persons.concat(newPersons));
      setMessage(`${newName} has been added`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    deleteNumber(id).then(() => {
      setStyle({
        ...style,
        color: "green",
      });
      let newPersons = persons.filter((person) => {
        if (person.id === id) {
          setMessage(`${person.name} has been deleted`);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else return true;
      });

      setPersons(newPersons);
      setFiltredPeople(newPersons);
    });
  };

  return (
    <div>
      <Notification msg={message} style={style} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <Add
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <Numbers people={filteredPeople} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
