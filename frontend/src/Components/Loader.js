import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import { useState } from 'react';
function Loader() {
    let [loading,setLoading] = useState(true);
   
  return (
    <div>
        <div className='sweet-loading d-flex justify-content-center align-item-center' >
      < FadeLoader color='blue' loading={loading} css='' size = {80} />
      </div>
    </div>
  )
}

export default Loader

// "2c48b2bf9c9c4075aaf5f3420a652efa";