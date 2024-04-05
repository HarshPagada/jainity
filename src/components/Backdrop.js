import React from 'react'

const Backdrop = ({sidebar, closesidebar}) => {
  return (
    <div>
      <div className={sidebar?'backdrop backdrop--open':'backdrop'} onClick={closesidebar}></div>
    </div>
  )
}

export default Backdrop
