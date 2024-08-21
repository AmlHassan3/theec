
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'


export default function Product() {
 let{ addToCart ,setcartNumber} =useContext(CartContext)
  const[Productslist,setProducts]=useState([])
async function getProducts(){
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  setProducts(data.data)
  console.log(data.data)
}  
 async function addTobyCart(id){
   let {data}=await addToCart(id)
   if(data.status==='success'){
 console.log(data)
 //data.message
    toast(data.message);
    setcartNumber(data.numOfCartItems)
   }
  }
  useEffect(()=>{  
    getProducts()}
  ,[])
  return (
    <div className="py-5 container">
    <div className='row gy-1'>
      {Productslist.length>0 ?
      <>
      {Productslist.map((product)=>{
        return <div className="col-md-3" key={product._id}>
         <div className=" card product  p-5">
          <Link  className="nav-link" to={`/Details/${product._id}`}>  <img src={product.imageCover} className='w-75 card-img' alt={product.title}/>
          <div className='card-body'>  <p className='card-title'>{product.category.name}</p>
          <h6 className='card-desc' >{product.title}</h6>
          <div className='d-flex justify-content-between '>
          <p>{product.price} EGP</p>
          <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color text-warning'></i></p>
          </div>
         </div>
          </Link>
        <div>  <button className='btn btn-outline-success   w-100' onClick={()=>{addTobyCart(product._id)}}>Add To Cart</button></div>
        
         </div>
        </div>
      })}
      </>
      :
      <div className='vh-100 d-flex justify-content-center align-items-center'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
        </div>
      }
      </div>
    </div>
  )
}
