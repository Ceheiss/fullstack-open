import { Part } from "./Part";

export const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)}
  </div>
);