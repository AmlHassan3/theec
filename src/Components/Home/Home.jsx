import React, { useContext } from 'react'
import Product from '../Product/Product'
import Category from '../Category/Category'
import HomeSlider from '../HomeSlider/HomeSlider'
import { userContext } from '../../context/CouterContext'
export default function Home() {
  const{userData }=useContext(userContext)
  return (
    <div>
   <div className='row'>
    <div className='col-md-1 d-flex flex-column justify-content-around'>
      <h6>    Hello ya {userData?.name}</h6>
    </div>
    <div className='col-md-11'>
    <div className='py-2'>   <HomeSlider/></div>
    </div>
   </div>
     
    
    <div className='py-2'>  <h1>Category</h1>
      <Category/></div>
    
    <div className='py-2'> 
    <h1>Product</h1>
      <Product/>
    </div>
     
    </div>
  )
}
