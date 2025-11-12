import React, { useReducer, useState } from "react"
const initialState=[]
const reducer=(state,action)=>{
    switch(action.type){
       case "ADD_TODO":
        return [
            ...state,
          {id:Date.now(),text:action.payload,completed:false}]
        case "TOGGLE_TODO":
          return state.map((todo)=>(
            todo.id===action.payload?{...todo,completed:!todo.completed}:todo
          ))
          case "DELETE_TODO":
            return state.filter((todo)=>
            todo.id!==action.payload)
          case "EDIT_TOGGLE":
            return state.map((todo)=>
              todo.id===action.payload.id?{...todo,text:action.payload.newTodo}:todo
            )
        default:
            return state
    }
   

}
function Todo(){
   const[todos,dispatch]=useReducer(reducer,initialState)
   const[text,setText]=useState("")
   const[newTodo,setNewTodo]=useState("")
   const[editId,setEditId]=useState(null)
   const handleAdd=()=>{
    if(text.trim()!==""){
        dispatch({type:"ADD_TODO",payload:text})
    }
    setText("")
   }
   const handleEdit=(id,text)=>{
   setEditId(id)
   setNewTodo(text)
   }
  const handleSave=()=>{
     dispatch({type:"EDIT_TOGGLE",payload:{id:editId,newTodo}})
     setEditId(null)
     setNewTodo("")
   }
   return(
    <div>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
        <ul>
          {todos.map((todo)=>(
            <li>
              {editId===todo.id?(
                <>
                <input type="text" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
                <button onClick={handleSave}>save</button>
                </>
              ):(
                <>
                  <span style={{textDecoration:todo.completed?"line-through":"none",cursor:"pointer"}}
              onClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }>
              {todo.text}
                </span>
                <button onClick={()=>handleEdit(todo.id,todo.text)}>Edit</button>
                <button onClick={()=>dispatch({type:"DELETE_TODO",payload:todo.id})}>Delete</button>
                </>
              )}
            </li>
          ))}
          </ul>
    </div>
   )
}
export default Todo