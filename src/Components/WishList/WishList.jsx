import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import Loader from '../Loader/Loader';


export default function WishList() {
  const [wishProducts , setWishProducts] =  useState([])
  const [removeLoading , setRemoveLoading] =  useState(false)
  const [addLoading , setaddLoading] =  useState(false)
  const [isLoading , setisLoading] =  useState(true)
  let {addToCart,setcartNumber,setNumberOfWish,numberOfWish,AddWishList}=useContext(CartContext);
  async function getWishList  ()
{

  const {data} = await AddWishList()
  console.log(data);
  setWishProducts(data.data)
  setNumberOfWish(data?.numberOfWish)
  setisLoading(false)
  setNumberOfWish(data.count)



}
async function addWishToCart(productId) {
  setaddLoading(true)
  const data = await addToCart(productId);
  if (data.status === "success") {

    setcartNumber(data?.numOfCartItems);
    setaddLoading(false)
    setWishProducts(prevWishProducts => prevWishProducts.filter(product => product.id !== productId));
    setNumberOfWish(prevNumberOfWish => prevNumberOfWish - 1); 


  }
}
useEffect(()=>{
  getWishList()
} , [])
  return (
    <div>
       
{ isLoading? <Loader/> :  <div className="container bg-main-light my-5">
 <h2 className=' fw-bolder my-5 py-5 text-center'>My wish List</h2>
{ wishProducts.map((ele , id)=>  <div key={id} className="row">
   
 <div className="col-md-2">
  <figure>
    <img src= {ele.imageCover} className='w-75'  alt="" />
  </figure>
 </div>
 <div className="col-md-10">
  <div className="d-flex justify-content-between align-items-center ">

<div>
<h3 className='h6 fw-bold my-3'> {ele.title} </h3>
    <div className="price fw-bold"> {ele.price} </div>
    <button  className='btn p-0 fw-bolder text-danger my-3 '> <i className="fa-solid fa-trash-can text-danger fw-bolder "></i> remove </button></div>
<div>
  <button onClick={()=>addWishToCart(ele.id)} className='btn btn-lg btn-info text-white my-2'> Add To Cart </button>
  
  </div>
  </div>
 </div>
  </div>)  }
 </div>
  }
    </div>
  )
}
