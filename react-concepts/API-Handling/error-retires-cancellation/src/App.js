import logo from './logo.svg';
import './App.css';
import ErrorHandling from './components/ErrorHandling/ErrorHandling';
import Retries from './components/Retries/Retries';
import Cancellation from './components/Cancellation/Cancellation';

function App() {
  return (
    <div className="App">
      <ErrorHandling />
       <Retries />
      <Cancellation /> 
    </div>
  );
}

export default App;
