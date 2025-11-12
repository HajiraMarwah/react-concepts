import logo from "./logo.svg";
import "./App.css";
import SimpleForm from "./components/SimpleForm";
import { Formik } from "formik";
import FormikYup from "./components/FormikYup";

function App() {
  return (
    <div className="App">
      {/* <SimpleForm /> */}
      <FormikYup />
    </div>
  );
}

export default App;
