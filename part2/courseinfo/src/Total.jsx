export const Total = ({parts}) => (
  <p><strong>total of {parts.reduce((accum, part) => accum + part.exercises, 0)} exercises</strong></p>
);