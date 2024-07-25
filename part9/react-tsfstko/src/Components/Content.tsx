import Part from "./Part";
import { CoursePart } from "../App";

interface propsI {
  courseParts: CoursePart[];
}

export default function Content({ courseParts }: propsI) {
  return (
    <div>
      Content
      <Part courseParts={courseParts} />
    </div>
  );
}
