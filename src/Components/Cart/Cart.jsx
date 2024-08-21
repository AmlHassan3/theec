import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
  let {getCart,DeleteCart,UpdateCart,setcartNumber,setcartNumberId}=useContext(CartContext);
  const [data,setdata]=useState([])
  const [price,setprice]=useState([])
  async function getbycart(){
    let data= await getCart();
setdata(data.data.data.products)
setprice(data.data.data.totalCartPrice);
setcartNumberId(data.data?.data._id)
  }
  async function RemoveProduct(id){
    let data= await DeleteCart(id);
    setdata(data.data.data.products)
    setcartNumber(data.data.numOfCartItems)
   
  }
  async function upDateProduct(id ,count)
  {
    if(count==0){
DeleteCart(id)
    }else{
    let data= await UpdateCart(id,count);
    setdata(data.data.data.products)
    setcartNumber(data.data.numOfCartItems)}
   
  }
  useEffect(()=>{  
    getbycart()
  
  }
  ,[])

  return (
    <div className="py-5 container">
      <h1>Shopping Cart</h1>
      <Link to="/Checkout" className='text-end'>
<button className='btn btn-success text-light'> onlinePayment</button>
      </Link >
   <div className='row gy-3'>
    <div className='col-md-11 shadow p-5 m-auto my-5'>
      <p><span className='fw-bold '>ToTal Price:</span>{price}</p>
      {data.map((product)=>{
        
      return  <div className='row border-bottom py-5'key={product._id}>
      
          <div className='col-md-1'>
            <img className='w-100' src={product.product.imageCover}/>
          </div>
          <div className='col-md-11 d-flex justify-content-between align-items-center'>
            <div>
              <h5>{product.product.title}</h5>
              <p>{product.price}</p>
              <button className='btn btn-outline-danger'onClick={()=>{ RemoveProduct(product.product._id)}}><i className='fa-regular fa-trash-can'></i>Remove</button>
            </div>
            <div>
            <button className='btn btn-outline-success' onClick={()=>{upDateProduct(product.product._id ,product.count+1)}}>+</button>
            <span className='mx-2'>{product.count}</span>
            <button className='btn btn-outline-success'onClick={()=>{upDateProduct(product.product._id ,product.count-1)}}>-</button>
            </div>
          </div>
        </div>
      })}
    </div>
   </div>
    
    </div>
  )
}
