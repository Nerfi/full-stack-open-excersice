interface IContent {
  name: string;
  exerciseCount: number;
}
interface propsI {
  courseParts: IContent[];
}

export default function Content({ courseParts }: propsI) {
  return (
    <div>
      Content
      {courseParts.map((course) => {
        return (
          <>
            <ul>
              <li>
                {course.name} {course.exerciseCount}
              </li>
            </ul>
          </>
        );
      })}
    </div>
  );
}
