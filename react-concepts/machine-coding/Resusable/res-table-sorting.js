import React, { useState } from "react";

function Table({ data, columns }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc"); // "asc" or "desc"

  const sorted = [...data];
  if (sortKey) {
    sorted.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDir === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (key) => {
    if (sortKey === key) {
      // toggle direction
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              style={{ cursor: "pointer" }}
            >
              {col.label} {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const data = [
    { name: "Alice", age: 25, city: "NY" },
    { name: "Bob", age: 30, city: "London" },
    { name: "Charlie", age: 22, city: "Paris" },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "city", label: "City" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Sortable Table</h1>
      <Table data={data} columns={columns} />
    </div>
  );
}
