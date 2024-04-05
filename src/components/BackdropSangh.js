import React from 'react'

function BackdropSangh({sanghbar, closesidebar}) {
  return (
    <div>
      <div className={sanghbar ?'backdrop backdrop--open':'backdrop'} onClick={closesidebar}></div>
    </div>
  )
}

export default BackdropSangh
