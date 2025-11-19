import React, { createContext, useReducer, useContext } from 'react';
const TodoContext = createContext();
const TodoDispacthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state
  }
};
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <TodoContext.Provider value={state}>
      <TodoDispacthContext.Provider value={dispatch}>
        {children}
      </TodoDispacthContext.Provider>
    </TodoContext.Provider>
  );
}
export const useTodos = () => useContext(TodoContext);
export const useDispatchTodos = () => useContext(TodoDispacthContext);
