const FormPerson = ({handleSubmit,newName, handleChange, newNumber, handleChangenumber }) => {
  return <>
   <form onSubmit={handleSubmit}>
        <h3>Add a new</h3>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
         <div>
          number: <input value={newNumber} onChange={handleChangenumber}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  </>;
};

export default FormPerson;
