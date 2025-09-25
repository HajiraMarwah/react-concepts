import Counter from "./components/Counter";
import MultiUseEffect from "./components/MultiUseEffect";
import Timer from "./components/Timer";
import UserList from "./components/UserList";
import WindowSize from "./components/WindowSize";

function App() {
  return (
    <>
      <MultiUseEffect />

      {/* Fetching data from an API */}
      <UserList />

      {/* Updating the DOM manually */}
      <Counter />

      {/* Setting up timers or intervals */}
      <Timer/>

      {/*  */}
      <WindowSize />
    </>
  );
}

export default App;
