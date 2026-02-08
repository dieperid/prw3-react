const Anecdote = ({ text, votesCount }) => (
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>
);

export default Anecdote;
