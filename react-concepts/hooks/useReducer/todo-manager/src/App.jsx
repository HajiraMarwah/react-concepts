import { useState } from "react";
import { useReducer } from "react";

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");
  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: text });
  };
  return (
    <div >
      <h1>Todo App using useReducer</h1>
      <input
      style={{ fontSize: "30px" }}
        type="text"
        placeholder="add todo.."
        onChange={(e) => setText(e.target.value)}
      />
      <button style={{ fontSize: "25px" }} onClick={handleAdd}>
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                fontSize:"30px"
              }}
            >
              {todo.text}
            </span>
            <button
            style={{ fontSize: "25px" }}
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: todo.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
