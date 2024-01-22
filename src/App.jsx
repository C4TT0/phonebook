import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import { create, getAll, deletePerson } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [toFilter, setToFilter] = useState("");
  const [newName, setNewName] = useState("add name");
  const [newNum, setNewNum] = useState("add number");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getAll().then((data) => setPersons(data));
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleDelete = (id) => {
    let confirm = window.confirm(
      `Are you sure you want to delete ${
        persons.find((person) => person.id === id).name
      }?`,
    );

    if (confirm) {
      deletePerson(id).then((data) => {
        alert(`${data.name} deleted from Phonebook`);
      });

      let newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
    }
  };

  const handleFilter = (e) => {
    let text = e.target.value.toLowerCase();
    setToFilter(text);

    let filteredArr = persons.filter((person) =>
      person.name.toLowerCase().includes(text),
    );
    setFiltered(!text ? [] : filteredArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let num = e.target[1].value;

    if (name && num) {
      if (persons.map((person) => person.name).includes(name)) {
        let confirm = window.confirm(
          `${name} is already in Phonebook, replace the old number with the new one?`,
        );
        /*
        if (confirm) {
          let existingPerson = persons.find((person) => person.name == name);
          let newObj = { ...existingPerson, number: num };

          update(newObj)
            .then(() => {
              let updatedPerson = persons
                .filter((person) => person.name !== name)
                .concat(newObj);
              setPersons(updatedPerson);
            })
            .catch((err) => alert(err));

          setNotification(`${name}'s number successfully updated!`);
          setTimeout(() => setNotification(""), 2000);
        }
        */
        setNotification(`${name}'s number successfully updated!'`);
        setTimeout(() => setNotification(""), 2000);
      } else {
        let newObject = { name: name, number: num };
        create(newObject)
          .then((data) => setPersons(persons.concat(data)))
          .catch((err) => console.log(err));

        setNotification(`${name} added to Phonebook!`);
        setTimeout(() => setNotification(""), 2000);
      }

      setNewName("");
      setNewNum("");
    } else {
      alert("Name or number missing");
    }
  };

  return (
    <>
      <Notification message={notification} />
      <h1>Phonebook</h1>
      <Filter
        toFilter={toFilter}
        handleFilter={handleFilter}
        filtered={filtered}
      />
      <Form
        newName={newName}
        newNum={newNum}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />
      <Persons persons={persons} handleDelete={handleDelete} />
    </>
  );
};

export default App;
