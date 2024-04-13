import { store } from "./reducer";

function App() {
  return (
    <>
      <div className="btns">
        <button  onClick={e => store.dispatch({ type: 'GOOD' })} >Good</button>
        <button onClick={() => store.dispatch({type: "OK"})}> ok</button>
        <button onClick={() => store.dispatch({type: "BAD"})}>Bad</button>
        <button onClick={() => store.dispatch({type: "ZERO"})}>reset stats</button>
      </div>
      <div
        className="results"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span>good {store.getState().good}</span>
        <span>ok {store.getState().ok}</span>
        <span>bad {store.getState().bad}</span>
      </div>
    </>
  );
}

export default App;
