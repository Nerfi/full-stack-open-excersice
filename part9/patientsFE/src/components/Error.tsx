interface IError {
  error: String;
}

export default function Error({ error }: IError) {
  return <div style={{ color: "red" }}>{error}</div>;
}
