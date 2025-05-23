import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

