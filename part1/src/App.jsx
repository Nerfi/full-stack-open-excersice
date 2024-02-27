const Header = ({course}) => {
  return <>
  <h1>{course.name}</h1>
  </>

};

const Part =({part, exercise})=> {
 
  return <p>{part} - {exercise}</p>

};

const Content = ({parts}) => {

 
  return(
    <div>
   {parts.parts.map(part => {
    return <Part key={part} part={part.name} exercise={part.exercises}/>
   })}
</div>

  )

 

};

const Total =({parts}) => {

  // no olvides esta linea
  const totalExercises = parts.parts.reduce((sum, part) => sum + part.exercises, 0);

return <p> las partes totales son {totalExercises}</p>

};






const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
     <Content parts={course} />
     <Total parts={course}/>
    </div>
  )
}

export default App