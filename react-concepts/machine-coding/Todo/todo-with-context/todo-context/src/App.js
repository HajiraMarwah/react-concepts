import React from 'react';
import { TodoProvider } from './components/TodoProvider';
import {TodoApp} from './components/TodoApp';
import './style.css';

export default function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}
