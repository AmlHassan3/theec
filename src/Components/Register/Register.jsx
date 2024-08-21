import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from'yup'
  import { useFormik } from 'formik'
import axios from 'axios'

export default function Register() {
  let[error,setError]=useState()
  let[Loading,setLoading]=useState(false)
  let navigate=useNavigate()
  let validationSchema= Yup.object({
name:Yup.string().min(3, 'minLength is 3').max(15,'maxLength is 15').required('name is required'),
phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone enter01 '),
email:Yup.string().required('email is required').email(' enter avalid email'),
password:Yup.string().required('password is required').matches(/^[A-Z][a-z-0-9]/,'password is matches'),
rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'Repassword is matches')
  })
  async function sinup(value){
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,value).catch((err)=>{
      setLoading(false)
      setError(err.response.data.message)
    }
    )
    
    if(data.message ==="success"){
      navigate('/Login')
      setLoading(false)
  }
  }
 let user= useFormik({
initialValues:{
  name:'',
  phone:'',
  email:'',
  password:'',
  rePassword:'',
},
validationSchema:validationSchema,
onSubmit:sinup


  })
  return (
    <>
  
       <form className='my-4' onSubmit={user.handleSubmit}>
       <h1  className='text-main text-center' >Register</h1>
       <div className='row '>
        <div className='col-md-8  m-auto'>
          <div className='row gy-3   bg-light shadow p-4'>
        <div className="col-md-12  ">
            <label className="text-main" htmlFor='name'> Name</label>
            <input  className="form-control  bg-transparent text-main " id="name"onBlur={user.handleBlur}
            placeholder="Enter you Name"value={user.values.name} onChange={user.handleChange} type="text" name="name" />
            {user.errors.name&& user.touched.name?<p className='text-danger' >{user.errors.name}</p>:''}
        </div>
        <div className="col-md-12 ">
            <label className="text-main" htmlFor='phone'>phone</label>
            <input type='tel' className="form-control  bg-transparent text-main" id="phone"onBlur={user.handleBlur}
            placeholder="Enter you phone"value={user.values.phone} onChange={user.handleChange} name="phone"/>
            {user.errors.phone&& user.touched.phone?<p className='text-danger' >{user.errors.phone}</p>:''}
        </div>
        <div className="col-md-12  m-auto">
            <label className="text-main"  htmlFor='email'>Email</label>
            <input  className="form-control  bg-transparent text-main"placeholder="Enter you Email"  id="email"onBlur={user.handleBlur}
             value={user.values.email}onChange={user.handleChange} type="email" name="email"/>
             {user.errors.email&& user.touched.email?<p className='text-danger' >{user.errors.email}</p>:''}
        </div>
       
        <div className="col-md-12  ">
            <label className="text-main" htmlFor='password'>Password</label>
            <input  className="form-control  bg-transparent text-main" type="password" id="password"onBlur={user.handleBlur}
            placeholder="Enter you password"value={user.values.password} onChange={user.handleChange} name="password"/>
            {user.errors.password&& user.touched.password?<p className='text-danger' >{user.errors.password}</p>:''}
        </div>
        <div className="col-md-12 ">
            <label htmlFor='rePassword' className="text-main">Repassword</label>
            <input  className="form-control  bg-transparent text-main" id="rePassword"onBlur={user.handleBlur}
            placeholder="Enter you Repassword"onChange={user.handleChange} type="password"value={user.values.rePassword} name="rePassword"/>
            {user.errors.rePassword&& user.touched.rePassword?<p className='text-danger' >{user.errors.rePassword}</p>:''}
        </div>
        <div className="col-md-12  text-end">
      <button type="submit" disabled={!(user.isValid && user.dirty)} className="btn btn-success">Register
      {Loading?<span><i className='fa-solid text-light m-2  fa-spinner fa-spin'></i></span>:""} </button>
      </div>
      {error!==null ?<p className='text-danger'>{error}</p>:''}
      <p className='text-muted'>I have not an account <Link className='nav-link text-main fw-bold' to ='/Login'>Login</Link></p>
        </div>
       </div>
      

      
</div>
</form>
        
        
    </>
  )
}
