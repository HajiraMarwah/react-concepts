import React, { useState, useEffect } from "react";
import withLoading from "./components/withLoading";
import UserList from "./components/UserLIst";

const UserListWithLoading = withLoading(UserList);

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from JSONPlaceholder API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>User List</h1>
      <UserListWithLoading isLoading={loading} users={users} />
    </div>
  );
}

export default App;
