import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
