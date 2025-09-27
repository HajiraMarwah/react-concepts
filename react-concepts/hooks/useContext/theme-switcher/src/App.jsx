import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";

import  ThemeConsumer  from "./components/ThemeConsumer";

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    </>
  );
}

export default App;
