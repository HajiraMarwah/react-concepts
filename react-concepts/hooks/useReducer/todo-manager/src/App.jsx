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
    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo
      );
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [newText, setNewText] = useState("");
  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TODO", payload: text });
  };
  const handleEdit = (id, text) => {
    setEditId(id);
    setNewText(text);
  };
  const handleUpdate = () => {
    dispatch({ type: "EDIT_TODO", payload: { id: editId, newText } });
    setEditId(null);
    setNewText("");
  };
  return (
    <div>
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
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />

                <button onClick={handleUpdate} style={{ fontSize: "25px" }}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                  }
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  style={{ fontSize: "25px" }}
                >
                  Edit
                </button>
                <button
                  style={{ fontSize: "25px" }}
                  onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todo.id })
                  }
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
