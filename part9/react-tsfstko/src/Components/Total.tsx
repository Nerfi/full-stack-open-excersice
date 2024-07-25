interface ITotal {
  totalExercise: number;
}

export default function Total({ totalExercise }: ITotal) {
  return <div>Total {totalExercise}</div>;
}
