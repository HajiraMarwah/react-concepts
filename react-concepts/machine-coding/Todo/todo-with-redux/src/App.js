import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo, updateTodo } from "./components/todosSlice";

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState("");
  const handleAdd = () => {
    if (text.trim() !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };
  const handleEdit=(id,text)=>{
    setEditId(id)
    setNewText(text)
  }
  const handleSave=(id)=>{
  
      dispatch(updateTodo({id,newText}))
      setEditId(null)
      setNewText("")
    
  }
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
              <input type="text" onChange={(e)=>setNewText(e.target.value)} value={newText} />
              <button onClick={()=>handleSave(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={()=>handleEdit(todo.id,todo.text)}>Edit</button>
                <button onClick={()=>dispatch(deleteTodo(todo.id))}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
