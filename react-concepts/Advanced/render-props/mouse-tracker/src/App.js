import logo from './logo.svg';
import './App.css';
import MouseTracker from "./MouseTracker"

function App() {
  return (
    <div className="App">
      <h1>Mouse Tracker</h1>
    <MouseTracker render={({x,y})=>(<p>Mouse position is ({x},{y})</p>)} />
    </div>
  );
}

export default App;
