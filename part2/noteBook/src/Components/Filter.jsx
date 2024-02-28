const Filter = ({filterPerson,handler }) => {
  return (
    <>
      <div>
        filter shown with:{" "}
        <input value={filterPerson} onChange={handler} />
      </div>
    </>
  );
};


export default Filter;