import React from "react"

function Table ({data,columns}){
  return(
    <div>
      <table border="1" cellPadding="10" style={{borderCollapse:"collpase",width:"100%"}}>
       <thead>
         <tr>
           {columns.map((col)=>(
           <th>{col.label}</th>
           ))}
         </tr>
       </thead>
       <tbody>
         {data.map((row,rowIndex)=>(
         <tr key={rowIndex}>
            {columns.map((col)=>(
            <td>{row[col.key]}</td>))}
         </tr>))}
       </tbody>
      </table>
    </div>
    )
}
function App(){
   const data = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "London" },
    { name: "Charlie", age: 22, city: "Paris" },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "city", label: "City" },
  ];

  return(
    <div>
      <Table data={data} columns={columns} />
    </div>)
}
export default App