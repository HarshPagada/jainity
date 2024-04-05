import React from 'react'

const BackdropLaabh = ({laabhbar, closesidebar}) => {
  return (
    <div>
       <div className={laabhbar ?'backdrop backdrop--open':'backdrop'} onClick={closesidebar}></div>
    </div>
  )
}

export default BackdropLaabh
