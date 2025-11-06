import React, { useEffect, useState } from "react";

function CRUDApp() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  // Fetch posts
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 10))) // limit to 10 for demo
      .catch((err) => console.error(err));
  }, []);

  // Add or Edit Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return alert("Title and body are required");

    const payload = { title, body };

    if (editingId) {
      // Edit post (PUT)
      try {
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const updatedPost = await res.json();

        // Optimistic state update
        setPosts((prev) =>
          prev.map((post) => (post.id === editingId ? updatedPost : post))
        );
        setEditingId(null);
        setTitle("");
        setBody("");
      } catch (err) {
        console.error(err);
      }
    } else {
      // Add post (POST)
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const newPost = await res.json();

        // Optimistic update
        setPosts((prev) => [newPost, ...prev]);
        setTitle("");
        setBody("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Edit button
  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditingId(post.id);
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((post) => post.id !== id)); // state update
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>React CRUD with Fake API</h1>

      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        ></textarea>
        <button type="submit">
          {editingId ? "Update Post" : "Add Post"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>{" "}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CRUDApp;
