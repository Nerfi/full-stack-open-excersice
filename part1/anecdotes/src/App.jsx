import { useState } from 'react'

const ButtonNext = ({ title ,onclickRandom})=>{
  return(
    <>
    <button onClick={onclickRandom}>{title}</button>
    </>
  )
}

const ButtonAnecdota = ({ title, votes, onClickVote }) => (
  <div>
    <button onClick={onClickVote}>{title}</button>
    <p>Votes: {votes}</p>
  </div>
)

const MostVotedAnecdota = ({votes, anecdotes}) => {


  //index of the max value  
  let indexOfMax = votes.indexOf(Math.max(...votes));

  let anecdote = anecdotes[indexOfMax];



  return<>
  <h3>Anecdote with most votes</h3>
  <br/>
  <p>{anecdote}</p>
  <br/>
  <p>has {votes[indexOfMax]} votes</p>
  </>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]



  const [selected, setSelected] = useState(0);

  //creamos una array con la longitud de nuestra array de anecdotas para saber a cual hemos votado

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  //random number
  const random = Math.floor(Math.random() * 9);

  //votes
  const handleVote = () => {
    const newVotes = [...votes];

    newVotes[selected] +=1;
    setVotes(newVotes);
  }


  return (
    <div>
      {anecdotes[selected]}
      <ButtonNext title="next anecdote" onclickRandom={() => setSelected(random)}/>
      <ButtonAnecdota title="vote" votes={votes[selected]} onClickVote={handleVote} />
      <MostVotedAnecdota votes={votes} anecdotes={anecdotes}/>

    </div>
  )
}

export default App