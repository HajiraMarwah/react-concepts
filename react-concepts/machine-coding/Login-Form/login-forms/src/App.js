import logo from "./logo.svg";
import "./App.css";
import SimpleForm from "./components/SimpleForm";
import { Formik } from "formik";
import FormikYup from "./components/FormikYup";
import Todo from "./components/Todo";


function App() {
  return (
    <div className="App">
      {/* <SimpleForm /> */}
      {/* <FormikYup /> */}
      <Todo />
    </div>
  );
}

export default App;
