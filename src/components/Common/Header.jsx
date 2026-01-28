import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

function Header() {
  return (
      <div>
          {/* topbar */}
          <Topbar />
          {/* navbar  */}
          <Navbar/>
          {/* cart drawer */}
     </div>
  )
}

export default Header