import React, { useEffect } from "react";

function FetchCancel() {
  useEffect(() => {
    const controlled = new AbortController();
    const signal = controlled.signal;
    fetch("https://jsonplaceholder.typicode.com/post", { signal })
      .then((res) => console.log(res.json()))
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.error("Fetch aborted");
        } else {
          console.error("Fetch Error", err);
        }
      });
        return()=>controlled.abort()

  },[]);
  return (
    <div>
      <h1>Check console for cancel errors</h1>
    </div>
  );
}

export default FetchCancel;
