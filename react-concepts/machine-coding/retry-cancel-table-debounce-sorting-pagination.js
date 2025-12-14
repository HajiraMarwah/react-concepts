import React, { useState, useEffect, useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      abortRef.current = new AbortController();

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/uses",
        { signal: abortRef.current.signal }
      );

      if (!response.ok) throw new Error("Network Error");

      const data = await response.json();
      setData(data);

    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to fetch data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setError("Request cancelled");
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Fetch Data</h1>

      {loading && <p>Loading...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error} &nbsp;
          <button onClick={fetchData}>Retry</button>
        </p>
      )}

      <button onClick={handleCancel} disabled={!loading}>
        Cancel Request
      </button>

      <table border="1" cellPadding="5" width="70%" style={{ borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
