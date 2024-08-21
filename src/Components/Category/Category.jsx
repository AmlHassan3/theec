import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FidgetSpinner } from 'react-loader-spinner';
import Slider from "react-slick";

export default function Category() {

  const[Categorylist,setCategory]=useState([])
  async function getCategory(){
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategory(data.data)
  }
  useEffect(()=>{
    getCategory()
  },[])
  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <>
      {Categorylist.length>0?
        <Slider {...settings}>
        {Categorylist.map((Category )=>{
        return <>
        <div className='py-5'key={Category._id}>
        <img src={Category.image} className='w-100' height={300}/>
          <p className='mb-5'>{Category.name}</p>
        </div>
        </>
        })}</Slider>:
        <div className='vh-100 d-flex justify-content-center align-items-center'>
        <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
        />
        </div>}
     
    </>
  )
}
