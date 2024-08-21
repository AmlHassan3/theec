import axios from 'axios'
import React, { useState } from 'react'
import * as Yup from'yup'
  import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
  
export default function ResetPassword() {
  let[error,setError]=useState()
  let[Loading,setLoading]=useState(false)
  let navigate=useNavigate()
  let validationSchema= Yup.object({

email:Yup.string().required('email is required').email(' enter avalid email'),
newPassword:Yup.string().required('newPassword')


  })
  async function Forget(value){
    let {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,value).catch((err)=>{
      setLoading(false)
      setError(err.response.data.message)
    }
    )

    
    if(data.token ){
      setError("Welcome back ,Your Password Changed")
setTimeout(() => {
  navigate('/Home')
},200);

      setLoading(false)
  }
  }
 let user= useFormik({
initialValues:{
  email:'',
  newPassword:'',

},
validationSchema:validationSchema,
onSubmit:Forget
  })
  return (
    <div  > <form className='my-4' onSubmit={user.handleSubmit}>
    <h1 >Reset Password</h1>
    <div className='row '>
     <div className='col-md-8  m-auto'>
       <div className='row gy-2   m-auto bg-light shadow p-4'>
     <div className="col-md-12  m-auto">
      
         <input  className="form-control  bg-transparent text-main"placeholder="Enter you Email"  id="email"onBlur={user.handleBlur}
          value={user.values.email}onChange={user.handleChange} type="email" name="email"/>
          {user.errors.email&& user.touched.email?<p className='text-danger' >{user.errors.email}</p>:''}
     </div>
     <div className="col-md-12 p-2 m-auto">
      
      <input  className="form-control  bg-transparent text-main"placeholder="Enter you newPassword"  id="newPassword"onBlur={user.handleBlur}
       value={user.values.newPassword}onChange={user.handleChange} type="password" name="newPassword"/>
       {user.errors.newPassword&& user.touched.newPassword?<p className='text-danger' >{user.errors.newPassword}</p>:''}
  </div>
    
     <div className="col-md-12  text-end">
   <button type="submit" disabled={!(user.isValid && user.dirty)} className="btn btn-success">Reset
   {Loading?<span><i className='fa-solid text-light m-2  fa-spinner fa-spin'></i></span>:""} </button>
   </div>
   {error!==null ?<p className='text-danger'>{error}</p>:''}
     </div>
    </div>  
</div>
</form></div>
  )
}
