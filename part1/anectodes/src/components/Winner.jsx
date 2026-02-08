const Winner = ({ anecdotes, allVotes }) => {
  const highestVoteCount = Math.max(...allVotes);
  const winnerIndex = allVotes.indexOf(highestVoteCount);
  const winner = anecdotes[winnerIndex];
  if (highestVoteCount === 0) {
    return <p>No votes yet</p>;
  }

  return (
    <div>
      <p>{winner}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  );
};

export default Winner;
