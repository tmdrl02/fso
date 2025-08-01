import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const MostVotes = ({anecdotes, votes}) => {
  var maxvote = 0
  var mostindx = 0

  for (let i = 0; i < 8; i++) {
    if (votes[i] > maxvote) {
      maxvote = votes[i]
      mostindx = i
    }
  }
  return (
    <div>
      <p>{anecdotes[mostindx]}</p>
      <p>has {maxvote} votes</p>
    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, updateVote] = useState(Array(anecdotes.length).fill(0))
  const getRandomArbitrary = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button
        onClick={() => {
          const copy = [...votes]
          copy[selected] += 1
          updateVote(copy)
        }}
        text = "vote" />
      <Button onClick={() => setSelected(getRandomArbitrary(0, 8))} text = "next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
