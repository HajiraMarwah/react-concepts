import React,{useState,useReducer}from "react"
const initialState=[]
const reducer=(state,action)=>{
  switch(action.type){
    case "ADD_TODO":
      return[
        ...state,
        {id:Date.now(),text:action.payload,completed:false}
        ]
      case "TOGGLE_TODO":
        return state.map((todo)=>todo.id===action.payload?{...todo,completed:!todo.completed}:todo)
      case "DELETE_TODO":
        return state.filter((todo)=>todo.id!==action.payload)
      case "UPDATE_TODO":
        return state.map((todo)=>todo.id===action.payload.id?{...todo,text:action.payload.text}:todo)
        default:
        return state
  }
}

function App(){
  const[todos,dispatch]=useReducer(reducer,initialState)
  const[texts,setTexts]=useState("")
  const[editingId,setEditingId]=useState(null)
  const[newText,setNewText]=useState("")
  const handleAdd=(id)=>{
    if(texts.trim()!==""){
      dispatch({type:"ADD_TODO",payload:texts})
    }
    setTexts("")
  }
  const handleEdit=(id,text)=>{
    setEditingId(id)
    setNewText(text)
  }
  const handleSave=(id)=>{
    dispatch({type:"UPDATE_TODO",payload:{id,text:newText}})
    setEditingId(null)
    setNewText("")
  }
  return(
    <div>
      <div>
        <input type="text" value={texts} onChange={(e)=>setTexts(e.target.value)}  />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {todos.map((todo)=>(
        <li>
        {editingId===todo.id?(<>
        <input type="text" value={newText} onChange={(e)=>setNewText(e.target.value)}/>
        <button onClick={()=>handleSave(todo.id)}>Save</button>
        </>):(<>
          <span style={{textDecoration:todo.completed?"line-through":"none",cursor:"pointer"}} onClick={()=>dispatch({type:"TOGGLE_TODO",payload:todo.id})}>
          {todo.text}
          </span>
          <button onClick={()=>handleEdit(todo.id,todo.text)}>Edit</button>
          <button onClick={()=>dispatch({type:"DELETE_TODO",payload:todo.id})}>Delete</button>

        </>)}
       
        </li>
        ))}
      </ul>
    </div>)
}
export default App