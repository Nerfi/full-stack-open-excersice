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


/*
Una forma práctica de estrechar esta clase de tipos en TypeScript es mediante el uso de expresiones switch case. 
Una vez que TypeScript haya inferido que una variable es de tipo unión
 y que cada tipo en la unión contiene un determinado atributo literal (en nuestro caso kind), podemos usarlo como un identificador de tipo.
 Luego podemos construir un switch case alrededor de este atributo y TypeScript sabrá qué atributos están disponibles dentro de cada bloque de case
 */