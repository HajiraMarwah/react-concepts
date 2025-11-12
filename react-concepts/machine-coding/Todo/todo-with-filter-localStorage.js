import React,{useState,useEffect} from "react"
function App(){
  const[text,setText]=useState("")
  const[todos,setTodos]=useState([])
  const[editId,setEditId]=useState(null)
  const[newText,setNewText]=useState("")
  const[filter,setFilter]=useState("All")
  
  // load todos from localStorage
  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem("todos"))
    if(storedTodos)setTodos(storedTodos)
  },[])
  
  // save todos to localStorage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  const handleAdd=()=>{
    if(text.trim()!==""){
    setTodos([...todos,{id:Date.now(),text:text,completed:false}])
    }
    setText("")
  }
  const toggleTodo=(id)=>{
    setTodos(todos.map((todo)=>(
      todo.id===id?{...todo,completed:!todo.completed}:todo)))
  }
  const handleDelete=(id)=>{
    setTodos(todos.filter((todo)=>todo.id!==id))
  }
  const handleEdit=(id,text)=>{
    setEditId(id)
    setNewText(text)
  }
  const handleSave=(id)=>{
    setTodos(todos.map((todo)=>(
      todo.id===id?{...todo,text:newText}:todo)))
    setEditId(null)
    setNewText("")
  }
  const filteredTodos=todos.filter((todo)=>{
    if(filter==="active")return !todo.completed
    if(filter==="completed") return todo.completed
    return true
  })
  return (
    <div>
      <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <div >
        <button  onClick={()=>setFilter("all")}>All</button>
        <button onClick={()=>setFilter("active")}>Active</button>
        <button onClick={()=>setFilter("completed")}>completed</button>
      </div>
      <ul>
        {filteredTodos.map((todo)=>(
        <li key={todo.id}>
          {editId===todo.id?(
          <>
            <input type="text" value={newText} onChange={(e)=>setNewText(e.target.value)}/>
            <button onClick={()=>handleSave(todo.id)}>Save</button>
          </>):(
          <>
             <span onClick={()=>toggleTodo(todo.id)} style={{textDecoration:todo.completed?"line-through":"none",cursor:"pointer"}}>{todo.text}</span>
             <button onClick={()=>handleEdit(todo.id,todo.text)}>Edit</button>
          <button onClick={()=>handleDelete(todo.id)}>Delete</button>
          </>)}
         
          </li>))}
      </ul>
    </div>)
  
}
export default App