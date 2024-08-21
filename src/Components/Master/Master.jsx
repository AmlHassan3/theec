import React, { useContext, useEffect } from 'react'
import Navbor from '../Navbor/Navbor'
import { Outlet } from 'react-router-dom'
import { userContext } from '../../context/CouterContext'
import Footer from '../Footer/Footer'

export default function Master() {
  let {setToken}=useContext(userContext)
 
  useEffect(()=>{
if(localStorage.getItem('userTonken')!==null){
  setToken(localStorage.getItem('userTonken'))
}
  },[])
  return (
    <div>
      <Navbor/>
      <div className="container my-5">
      <Outlet/>
      <Footer/>
      </div>
    </div>
  )
}
