import React, { use, useState }  from "react";
function Todo(){
    const[todos,setTodos]=useState([])
    const[input,setInput]=useState("")
    const handleAdd=()=>{
        if(input.trim()==="")return
        const newTodos={id:Date.now(),text:input,completed:false}
        setTodos([
            ...todos,
            newTodos
        ])
        setInput("")
    }
 const handleDelete=(id)=>{
    setTodos(
        todos.filter((todo)=>todo.id!==id)
    )
 }
 const handletoggle=(id)=>{
    setTodos(
        todos.map((todo)=>(
            todo.id===id?{...todo,completed:!todo.completed}:todo
        ))
    )
 }
    return(
        <div>
            <input  type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="add todos"/>
            <button onClick={handleAdd}>Add Todo</button>
            <ul>
                {todos.map((todo)=>(
                    <li>
                        <span onClick={()=>handletoggle(todo.id)} style={{textDecoration:todo.completed?"line-through":"none",cursor:"pointer"}}>
                        {todo.text}
                        </span>
                        <button onClick={()=>handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}