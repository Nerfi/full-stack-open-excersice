interface IHeader {
  courseName: string;
}

export default function Header({ courseName }: IHeader) {
  return <div>{courseName}</div>;
}
