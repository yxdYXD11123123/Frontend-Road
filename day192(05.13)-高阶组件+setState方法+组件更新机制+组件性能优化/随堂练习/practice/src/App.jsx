import './App.css';
import CurPosition from "./components/CurPosition";
import Square from "./components/Square";
import SetStateCom from "./components/SetStateCom"

function App() {
  return (
    <div className="App">
      <CurPosition msg={"外部传给高阶组件的信息"}></CurPosition>
      <Square width={10} height={20}></Square>
      <SetStateCom></SetStateCom>
    </div>
  );
}

export default App;
