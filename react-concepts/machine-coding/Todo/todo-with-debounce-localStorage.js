import React,{useState,useEffect} from "react"
function App(){
  const[todos,setTodos]=useState([])
  const[text,setText]=useState("")
  const[search,setSearch]=useState("")
  const[filtered,setFiltered]=useState([])
  useEffect(()=>{
    const timer=setTimeout(()=>{
      handleFilter()
    },500)
    return()=>{clearTimeout(timer)}
  },[search,todos])
  const handleAdd=()=>{
    if(!text.trim()) return;
      setTodos([...todos,{id:Date.now(),text}])
      setText("")
    
  }
  const handleDelete=(id)=>{
    setTodos(todos.filter((i)=>i.id!==id))
  }
  const handleFilter=()=>{
    setFiltered(todos.filter((f)=>f.toLowerCase().includes(search.toLowerCase())))
  }
  const listToShow=search?filtered:todos
  //persisting in local storage
  useEffect(()=>{
    const stored=JSON.parse(localStorage.getItem("todos"))
    if(stored)setTodos(stored)
  },[])
useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
},[todos])
  return(
    <div>
      <h1>Todos</h1>
      <input type="text" placeholder="add todos" value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <br />
      <br />
      <input value={search} placeholder="Search todos" onChange={(e)=>setSearch(e.target.value)} />
      <ul style={{listStyle:"none"}}>
        {listToShow.map((todo)=>(
          <li>
            {todo.text}
          <button onClick={()=>handleDelete(todo.id)}>delete</button>
          </li>
        ))}
        </ul>
      </div>
  )
}
export default App