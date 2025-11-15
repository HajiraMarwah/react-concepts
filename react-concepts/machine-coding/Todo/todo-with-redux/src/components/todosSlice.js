import { createSlice } from "@reduxjs/toolkit";

const todosSlice=createSlice({
    name:"todos",
    initialState:[],
    reducers:{
        addTodo:(state,action)=>{
            state.push({
                id:Date.now(),
                text:action.payload
            })
        },
       deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action) => {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo
      );
    },
       
    }
   
})
export const {addTodo,deleteTodo,updateTodo}=todosSlice.actions
export default todosSlice.reducer