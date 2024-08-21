import axios from 'axios'
import React from 'react'
import { FidgetSpinner } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Brands() {
 async function getBrands(){
return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let {data, isLoading ,refetch}=useQuery('brands',getBrands,{cacheTime:3000,enabled:false
  })
  return (

    <div className='row py-5'>
      <button className='btn btn-light  ' onClick={()=>{
        refetch()
      }}>Refetch Data</button>
      {!isLoading?  <>
      {data?.data.data.map((brand)=>{
        return<div className='col-md-3' key={brand._id}>
          <img src={brand.image} className='w-100'/>
          <p > {brand.name}</p>
        </div>

      })}</>:<div className='vh-100 d-flex justify-content-center align-items-center'>
      <FidgetSpinner
      visible={true}
      height="80"
      width="80"
      ariaLabel="fidget-spinner-loading"
      wrapperStyle={{}}
      wrapperClass="fidget-spinner-wrapper"
      />
      </div>}
     
    </div>
  )
}
