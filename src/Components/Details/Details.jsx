import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

export default function Details() {
  let{ addToCart,setcartNumber} =useContext(CartContext)
  const[Productslist,setProducts]=useState(null)
   let params=useParams();
   console.log(params.id)
let   ProductsId=params.id
   async function getProducts(){
    console.log('data.data')
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${ProductsId}`)
    console.log(data.data)
    setProducts(data.data)}
  useEffect(()=>{  
    getProducts()
  
  }
  ,[])
  async function addTobyCart(id){
    let {data}=await addToCart(id)
    if(data.status=='success'){
         toast.success(data.message);
         setcartNumber(data.numOfCartItems)
        }
   }
  return (
    <div className='my-5'> <div className='row '>
    <div className='col-md-3'>
 <img src={Productslist?.imageCover} className='w-100' alt='imageCover'/>
    </div>
    <div className='col-md-9 d-flex flex-column justify-content-around'>
      <div> 
      <h1>{Productslist?.title}</h1>
      <p>{Productslist?.description}</p>
      </div>
     
      <div >
        <p>{Productslist?.category.name}</p>
        <p><span>Price:</span>  {Productslist?.price}</p>
        <p><span> {Productslist?.ratingsAverage}</span> <i  className='fa-solid fa-star'></i></p>
       <button className='btn btn-info bg-main text-light 'onClick={()=>{addTobyCart(Productslist._id)}}>Add To Cart</button>
      </div>

      </div>
  </div></div>
   
  )
}
