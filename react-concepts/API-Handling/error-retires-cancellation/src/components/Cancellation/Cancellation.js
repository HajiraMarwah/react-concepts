import React from 'react'
import FetchCancel from './FetchCancel'
import AxiosCancellation from './AxiosCancellation'

function Cancellation() {
  return (
    <div>
        <FetchCancel />
        <AxiosCancellation />
    </div>
  )
}

export default Cancellation