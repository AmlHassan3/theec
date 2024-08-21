import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from'yup'
  import { useFormik } from 'formik'
import axios from 'axios'
import { userContext } from '../../context/CouterContext'
export default function Login() {
 let {setToken,getUserData}= useContext(userContext)
    let[error,setError]=useState()
    let[Loading,setLoading]=useState(false)
    let navigate=useNavigate()
    let validationSchema= Yup.object({

  email:Yup.string().required('email is required').email(' enter avalid email'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z-0-9]/,'password is matches'),
 
    })
    async function sinin(value){
      let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,value).catch((err)=>{
        setLoading(false)
        setError(err.response.data.message)
      }
      )
      
      if(data.message ==="success"){
        navigate('/Home');
        localStorage.setItem('userTonken',data.token)
        setToken(data.token)
       getUserData()
        setLoading(false)
    }
    }
   let user= useFormik({
  initialValues:{
    email:'',
    password:'',
 
  },
  validationSchema:validationSchema,
  onSubmit:sinin
  
  
    })
    return (
      <>
    
         <form className='my-4' onSubmit={user.handleSubmit}>
         <h1 >Login</h1>
         <div className='row '>
          <div className='col-md-8  m-auto'>
            <div className='row gy-3   m-auto bg-light shadow p-4'>
        
        
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
         
          <div className="col-md-12  text-end">
        <button type="submit" disabled={!(user.isValid && user.dirty)} className="btn btn-success">Login
        {Loading?<span><i className='fa-solid text-light m-2  fa-spinner fa-spin'></i></span>:""} </button>
        </div>
        {error!==null ?<p className='text-danger'>{error}</p>:''}
        <ul className="d-flex justify-content-between">
                  <li className="nav-item ">
                <Link className= ' nav-link text-main fw-bold' to ='/Register'>Register</Link>
                 
                    </li>
                    <li className="nav-item ">
                  
                  <Link className= ' nav-link text-main fw-bold' to ='/Forget'>Forget Password</Link>
                    </li>
                    </ul>
        
          </div>
         </div>
        
  
        
  </div>
  </form>
          
          
      </>
  )
}
