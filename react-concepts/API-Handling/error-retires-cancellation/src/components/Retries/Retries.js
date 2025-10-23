import React from 'react'
import FetchWithRetry from './FetchWithRetry'
import AxiosWithRetry from './AxiosWithRetry'

function Retries() {
  return (
    <div>
        {/* <FetchWithRetry /> */}
        <AxiosWithRetry />
    </div>
  )
}

export default Retries