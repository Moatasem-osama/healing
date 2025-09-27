import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import AxiosInterceptor from '../../context/AxiosInterceptor'

export default function Layout() {
  return (<>
  <AxiosInterceptor>

    <Navbar/>
    <div className="mt-15 bg-gradient-to-br from-emerald-50 to-green-50 min-h-screen ">
    <Outlet/>
    </div>
  </AxiosInterceptor>
  </>
  )
}
