import "./App.css"
import CounterComponent from "./components/CounterComponent/CounterComponent";
import FetchComponent from "./components/FetchComponent/FetchComponent";

function App() {
  return (
     <div className="app-root">
      <CounterComponent />

      <FetchComponent />
    </div>
  );
}

export default App;
