import React, { useEffect } from "react";

async function FetchComponentRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`http error:${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn(`Attempted ${i + 1} failed:${error.message}`);
      if (i < retries - 1) await new Promise((res) => setTimeout(res, delay));
      else throw error;
    }
  }
}

function FetchWithRetry() {
  useEffect(() => {
    FetchComponentRetry("https://jsonplaceholder.typicode.com/poss")
      .then((data) => console.log(data))
      .catch((err) => console.error("All retries failed", err));
  }, []);
  return (
    <div>
        <h1>check console for error as i have spell mistake in url</h1>
      
    </div>
  );
}

export default FetchWithRetry;
