
import React from 'react'
import loading from './pics/loading.gif' 


const Spinner = () => {
  return (
    <div className='text-center' >
             <img className='my-3' src={loading} alt="loading" style={{height:'40px',widows:'40px'}}/>
      </div>
  )
}

export default Spinner
