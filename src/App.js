import logo from './logo.svg';
import './App.css';
import useNumberBaseStore from "./modules/zustand/testStore";

function App() {
  const { numberA, numberB, increaseNumberA, increaseNumberB} = useNumberBaseStore();
  
  return (
    <div className="App">
      <h2>numberA : {numberA}</h2>
      <h2>numberA : {numberB}</h2>
      <button onClick={increaseNumberA}>A 증가</button>
      <button onClick={() => increaseNumberB(3)}>B 증가</button>
      
    </div>
  );
}

export default App;
