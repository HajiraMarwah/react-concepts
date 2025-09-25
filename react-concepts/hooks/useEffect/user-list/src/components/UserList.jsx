import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network Response is not ok");
        return res.json();
      })
      .then((data) => {
        console.log("dataas",data)
        setUsers(data)})
      .catch((err) => setError(err.msg))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Loading users.....</p>;
  if (error) return <p>Error:{error}</p>;
  return (
    <div>
      <h1>User Lists</h1>
      <ul>
        {users.length>0?users.map((user) => (
          <li key={user.id}>{user.name}</li>
        )):"No users Found"}
      </ul>
    </div>
  );
}

export default UserList;
