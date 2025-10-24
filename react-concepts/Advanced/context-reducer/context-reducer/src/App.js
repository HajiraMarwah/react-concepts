import logo from './logo.svg';
import './App.css';
import { GlobalProvider } from './context/GlobalProvider';
import Counter from './component/Counter';
import { AuthProvider } from './context/AuthProvider';
import Login from "./component/Login"
import { ThemeProvider } from './context/ThemeProvider';
import Dahboard from './component/Dahboard';

function App() {
  return (
    <div className="App">
     <GlobalProvider>
      <Counter />
     </GlobalProvider>
     
      <AuthProvider>
        <Login />
      </AuthProvider>

      <ThemeProvider>
        <Dahboard />
      </ThemeProvider>
     
    </div>
  );
}

export default App;
