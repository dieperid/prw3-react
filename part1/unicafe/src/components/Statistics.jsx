import Statistic from "./Statistic";

const Statistics = ({ clicks }) => {
  const total = clicks.good + clicks.neutral + clicks.bad;
  const average = (clicks.good * 1 + clicks.bad * -1) / total;
  const positive = clicks.good * (100 / total);

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={clicks.good} />
          <Statistic text="neutral" value={clicks.neutral} />
          <Statistic text="bad" value={clicks.bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
