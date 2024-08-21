
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';

export default function Checkout() {
  
  let {CheckoutPayment}=useContext(CartContext);
  async function payment(val ){
    let {data}=await CheckoutPayment(val);
    console.log(data)
    if(data.status=="success"){
      window.location.href=data.session.url
    }
  
  }
 let user= useFormik({
initialValues:{
  details:'',
  city:'',
  phone:'',
},
onSubmit:payment
  })
  return (
    <>
  
       <form className='my-4' onSubmit={user.handleSubmit}>
       <h1 >Payment Form</h1>
       <div className='row '>
        <div className='col-md-8  m-auto'>
          <div className='row gy-3   m-auto bg-light shadow p-4'>
      
        <div className="col-md-12  m-auto">
            <label className="text-main"  htmlFor='details'>details</label>
            <input  className="form-control  bg-transparent text-main"placeholder="Enter you details"  id="details"o
             value={user.values.details}onChange={user.handleChange} type="text" name="details"/>
             
        </div>
       
        <div className="col-md-12  ">
            <label className="text-main" htmlFor='city'>city</label>
            <input  className="form-control  bg-transparent text-main" type="text" id="city"
            placeholder="Enter you city"value={user.values.city} onChange={user.handleChange} name="city"/>
            
        </div>
       
        <div className="col-md-12  ">
            <label className="text-main" htmlFor='phone'>phone</label>
            <input  className="form-control  bg-transparent text-main" type="tel" id="phone"
            placeholder="Enter you phone"value={user.values.phone} onChange={user.handleChange} name="phone"/>
            
        </div>
        <div className="col-md-12  text-end">
      <button type="submit"className="btn btn-success">Payment
      </button>
      </div>
     
     
      
        </div>
       </div>
      

      
</div>
</form>
        
        
    </>
)
}
