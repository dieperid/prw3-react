import { useState } from "react";

import Header from "./components/Header";
import Anecdote from "./components/Anectode";
import Winner from "./components/Winner";
import Button from "./components/Button";

import anecdotes from "./lib/data";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(Array(6).fill(0));

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes];
    newAllVotes[selected] += 1;
    setAllVotes(newAllVotes);
  };

  const handleAnecdoteClick = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(arrayIndex);
  };

  return (
    <div>
      <Header name="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleAnecdoteClick} text="Next anecdote" />

      <Header name="Anecdote with most votes" />
      <Winner anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  );
};

export default App;
