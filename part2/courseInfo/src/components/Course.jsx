const Header = ({ course }) => {
    return <h1>{course.name}</h1>
 }
 
 
 const Total = ({ sum }) =>{
   const {parts} =  sum;
  const result = parts.reduce((a,b) => a +b.exercises , 0);
 
  return <p>total of {result} exercises</p>
 }
 
 const Part = ({ part }) => {
  return <p>
     {part.name} {part.exercises}
   </p>
 }
 
 
 const Content = ({ parts }) => {
   const {parts: partes}= parts;
 
   const partesDinamicas = partes.map((part) => {
     return <Part  key={part.id} part={part} />;
   });
   return <>{partesDinamicas}</>;
 };
 
 
 
 
 
 const Course = ({ course }) => {
   //console.log(course , " course in course")
 
   return (
     <>
       <Header course={course[0]} />
       <Content parts={course[0]} />
       <Total sum={course[0]} />
       <Header course={course[1]} />
       <Content parts={course[1]} />
       <Total sum={course[1]} />
     </>
   );
 };

 export default Course;