import React, { useState } from 'react';
import { useTodos, useDispatchTodos } from './TodoProvider';
export const TodoApp = () => {
  const [text, setText] = useState('');
  const todos = useTodos();
  const dispatch = useDispatchTodos();
  const handleAdd = () => {
    if (text.trim !== '') {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };
  return (
    <div>
      <h1>Todos</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li>
            <span style={{textDecoration:todo.completed?"line-through":"none"}} onClick={()=>dispatch({type:"TOGGLE_TODO",payload:todo.id})}>{todo.text}</span>
            <button
              onClick={() =>
                dispatch({ type: 'DELETE_TODO', payload: todo.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
