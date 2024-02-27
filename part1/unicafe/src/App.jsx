import { useState } from 'react'

// componentes 

const Header = () => {
  return <h2>give feedback</h2>
}

const Button = ({title, handleClcikPress}) => {
  return <button onClick={handleClcikPress}>{title} </button>
}

const Statistics =({goodReviews, neutralReviews, badReviews})=> {
  let allReviewsCount = goodReviews + neutralReviews + badReviews;

  let average = allReviewsCount / 3;

  let porcentajeGood = (goodReviews / allReviewsCount) * 100;


  if(allReviewsCount == 0) return <p>No feedback given </p>

  return(
    <>
    <h3>statistics</h3>
    <ul>
      <li>good {goodReviews}</li>
      <li> neutral {neutralReviews}</li>
      <li>bad  {badReviews}</li>
      <li>all {allReviewsCount} </li>
      <li>average {average}</li>
      <li>positive {porcentajeGood} %</li>
    </ul>

    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //handlers
  const handleGoodReview = () =>  setGood(prev => prev +1);
  
  


  return (
    <div>
     <Header/>
     <Button title="good" handleClcikPress={handleGoodReview}/>
     <Button title="neutral" handleClcikPress={() => setNeutral(prev => prev +1)}/>
     <Button title="bad" handleClcikPress={() => setBad(prev => prev +1)}/>
     <Statistics goodReviews={good} neutralReviews={neutral} badReviews={bad}/>
    </div>
  )
}

export default App