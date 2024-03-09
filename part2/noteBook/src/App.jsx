import { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import FormPerson from "./Components/Form";
import Filter from "./Components/Filter";
import  personServices from "../services/index";
import Notification from "./Components/Notification";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPerson, setfilterPerson] = useState("");
  const [filteredPersons, setFilteredPerson] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError]= useState(false);


 
//fetching wit axios
useEffect(() => {
  personServices
    .getAll()
    .then((response) => setPersons(response))
    .catch((err) => alert(err));
}, []);

  const handleFilterPerson = (e) => {
    const newFilter = e.target.value.toLowerCase();
    setfilterPerson(newFilter);

    setFilteredPerson(
      newFilter
        ? persons.filter((person) =>
            person.name.toLowerCase().includes(newFilter)
          )
        : [...persons]
    );
  };


  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleChangenumber = (e) => {
    setNewNumber(e.target.value);
  };



  // TODO: check solution in order to see how to make it work properly, not working as expected rn

  const handleSubmit = (e) => {
    e.preventDefault();

    //check if the user is already added and not added it
    const names = persons.map((p) => p.name);

    const numbers = persons.map((p) => p.number);

    // if (names.includes(newName)  ) {
    //   alert(`${newName} is already added`);
    //   return;
    // }

    // if(names.includes(newName) && numbers != newNumber ) {
    //  const confirmation = window.confirm(`${newName} is already added do you want to change his number?`)

    //  //just for testing
    //  const testing = persons.map(p => {
    //   if(p.name === newName) {
    //     return p.name === newName;
    //   }
    //  })

    //  console.log(testing , "testing whole object")

    //   if(confirmation){
    //    // personServices.update()

    //    return;
    //   }

    // }

    // const existingPerson = persons.find(
    //   (p) => p.name === newName && p.number != newNumber
    // );
    // if (existingPerson) {
    //   const confirmation = window.confirm(
    //     `${newName} is already added do you want to change his number?`
    //   );
    //   if (confirmation) {
    //     const updatedPerson = { ...existingPerson, number: newNumber };
    //     const { id } = existingPerson;
    //     personServices
    //       .update(id, updatedPerson)
    //      .then(res => {
    //       setPersons(prev => prev.map(p => p.id !== id ? p : {...res}))
    //      })

    //     return;
    //   }

    //   return
    // }

    //check for existing numbers

    
    

    // comprobar si existe el tio
    
    
    const existingPerson = persons.find((p) => p.name === newName && p.number !== newNumber);
    if(existingPerson || names.includes(newName)) {
      const confirmation = window.confirm(`${newName} is already added. Do you want to change his number?`);

      if(confirmation) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        const { id } = existingPerson;
        personServices
          .update(id, updatedPerson)
         .then(res => {
          setErrorMessage("succes, updated")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(prev => prev.map(p => p.id !== id ? p : {...res}))
         })
         .catch(err => {
          setErrorMessage(`${err.message}`);
          setIsError(true);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

         })

        return;
      }
      return
    }
    
    const newPersonCreated = { name: newName, number: newNumber };

    personServices
      .create(newPersonCreated)
      .then((response) => {
        setErrorMessage("succes, created")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons([...persons, response])
      })
      .catch((err) => {
        setErrorMessage(`${err.response.data.error}`);
        setIsError(true);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } );
  };

  const handleDelete = (id) => {
    personServices
      .deletePerson(id)
      .then(() =>
        setPersons((person) => {
          const newDate = person.filter((p) => p.id !== id);
          return newDate;
        })
      )
      .catch((err) => alert(err, " error"));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={isError} />

      <Filter filterPerson={filterPerson} handler={handleFilterPerson} />
      <FormPerson
        handleSubmit={handleSubmit}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleChangenumber={handleChangenumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filtradas={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
