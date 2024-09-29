import { Outlet } from "react-router-dom";
import Header from './header/Header';

import React from 'react'

const Layout = () => {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout
