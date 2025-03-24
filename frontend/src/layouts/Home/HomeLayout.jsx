import React from 'react'
import TopBar from './TopBar'
import Footer from './Footerr'

function HomeLayout({children}) {
  return (
    <div>
        <TopBar />
            <main>{children}</main>
        <Footer />
    </div>
  )
}

export default HomeLayout