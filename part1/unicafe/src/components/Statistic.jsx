const Statistic = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>
          {text} {value} %
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

export default Statistic;
