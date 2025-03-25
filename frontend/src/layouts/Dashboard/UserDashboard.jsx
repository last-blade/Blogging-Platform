import React from 'react'
import TopBar from './TopBar'

function UserDashboard({children}) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  )
}

export default UserDashboard