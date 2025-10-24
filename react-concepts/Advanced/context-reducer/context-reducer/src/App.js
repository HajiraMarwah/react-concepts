import logo from './logo.svg';
import './App.css';
import { GlobalProvider } from './context/GlobalProvider';
import Counter from './component/Counter';
import { AuthProvider } from './context/AuthProvider';
import Login from "./component/Login"

function App() {
  return (
    <div className="App">
     <GlobalProvider>
      <Counter />
     </GlobalProvider>
     
      <AuthProvider>
        <Login />
      </AuthProvider>
     
    </div>
  );
}

export default App;
