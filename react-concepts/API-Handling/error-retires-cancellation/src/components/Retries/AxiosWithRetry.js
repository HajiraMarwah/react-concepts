import React, { useEffect } from 'react'
import axios from 'axios';
import axiosRetry from "axios-retry"

function AxiosWithRetry() {
  useEffect(()=>{
    axiosRetry(axios, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });
    axios.get('https://jsonplaceholder.typicode.com/poss')
  .then(response => console.log(response.data))
  .catch(error => console.error('All retries failed:', error));
  })
  return (
    <div>
        <h1>check console for error as i have spell mistake in url</h1>
    
    </div>
  )
}

export default AxiosWithRetry