import { CoursePart } from "../App";

interface propsI {
  courseParts: CoursePart[];
}
export default function Part({ courseParts }: propsI) {
  return (
    <ul>
      {courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <li key={part.name}>
                {part.name} {part.exerciseCount}
              </li>
            );
          case "group":
            return (
              <li key={part.name}>
                {part.name} {part.groupProjectCount}
              </li>
            );
          case "background":
            return (
              <li key={part.name}>
                {part.name} {part.backgroundMaterial}
              </li>
            );

          case "special":
            return (
              <>
                <li key={part.name}>
                  {part.description} {part.exerciseCount}
                </li>
                <li>
                  required skills: {part.requirements[0]} {part.requirements[1]}
                </li>
              </>
            );
          default:
            return null;
        }
      })}
    </ul>
  );
}
