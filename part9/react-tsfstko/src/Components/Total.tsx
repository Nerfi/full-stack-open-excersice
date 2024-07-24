interface ITotal {
  totalExercise: number;
}

export default function Total({ totalExercise }: ITotal) {
  return <div>Total {totalExercise}</div>;
}

//https://fullstackopen.com/es/part9/react_con_tipos  lo dejamos aqui
//uso de tipos en profundidad
