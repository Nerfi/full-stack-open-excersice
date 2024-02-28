
const Persons = ({ persons, filtradas, handleDelete }) => {
  let toRender;


  if (filtradas.length > 0) {
    toRender = filtradas?.map((person) => (
      <div style={{ display: "flex" }}>
        <p key={person.name}>
          {person.name} {person.number}{" "}
        </p>
        <button
          style={{ margin: "10px" }}
          onClick={() => handleDelete(person.id)}
        >
          delete
        </button>
      </div>
    ));
  } else {
    toRender = persons?.map((person) => (
      <div style={{ display: "flex" }}>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        <button
          style={{ margin: "10px" }}
          onClick={() => handleDelete(person.id)}
        >
          delete
        </button>
      </div>
    ));
  }

  return <>{toRender}</>;
};

export default Persons;