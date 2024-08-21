
import React, {  useState } from 'react'
import * as Yup from'yup'
  import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ForgetPassword() {

  let[error,setError]=useState()
  let[Loading,setLoading]=useState(false)
  let navigate=useNavigate()
  let validationSchema= Yup.object({

email:Yup.string().required('email is required').email(' enter avalid email'),


  })
  async function Forget(value){
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,value).catch((err)=>{
      setLoading(false)
      setError(err.response.data.message)
    }
    )
    
    if(data.statusMsg ==="success"){
     document.querySelector('.forget').classList.add('d-none');
     document.querySelector('.forget2').classList.remove('d-none');

      setLoading(false)
  }
  }
 let user= useFormik({
initialValues:{
  email:'',

},
validationSchema:validationSchema,
onSubmit:Forget
  })
  let validationSchema2= Yup.object({

    resetCode:Yup.string().required('resetCode is required').matches(/^[0-9]/),
    
    
      })
      async function verifyReset(value){
        let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,value).catch((err)=>{
          setLoading(false)
          setError(err.response.data.message)
        }
        )
        
        if(data.status ==="Success"){
     navigate('/Reset')    
    
          setLoading(false)
      }
      }
     let Reset= useFormik({
    initialValues:{
      resetCode:'',
    
    },
    validationSchema:validationSchema2,
    onSubmit:verifyReset
      })
  return (
    <>
  <div className='forget' > <form className='my-4' onSubmit={user.handleSubmit}>
       <h1 >Forget Password</h1>
       <div className='row '>
        <div className='col-md-8  m-auto'>
          <div className='row gy-3   m-auto bg-light shadow p-4'>
        <div className="col-md-12  m-auto">
         
            <input  className="form-control  bg-transparent text-main"placeholder="Enter you Email"  id="email"onBlur={user.handleBlur}
             value={user.values.email}onChange={user.handleChange} type="email" name="email"/>
             {user.errors.email&& user.touched.email?<p className='text-danger' >{user.errors.email}</p>:''}
        </div>
       
        <div className="col-md-12  text-end">
      <button type="submit" disabled={!(user.isValid && user.dirty)} className="btn btn-success">Forget
      {Loading?<span><i className='fa-solid text-light m-2  fa-spinner fa-spin'></i></span>:""} </button>
      </div>
      {error!==null ?<p className='text-danger'>{error}</p>:''}
        </div>
       </div>  
</div>
</form></div>
      
<div className='forget2 d-none' > <form className='my-4' onSubmit={Reset.handleSubmit}>
       <h1 >Verify Reset Code</h1>
       <div className='row '>
        <div className='col-md-8  m-auto'>
          <div className='row gy-3   m-auto bg-light shadow p-4'>
        <div className="col-md-12  m-auto">
      
            <input  className="form-control  bg-transparent text-main"placeholder="Enter you resetCode"  id="resetCode"onBlur={Reset.handleBlur}
             value={Reset.values.resetCode}onChange={Reset.handleChange} type="resetCode" name="resetCode"/>
             {Reset.errors.resetCode&& Reset.touched.resetCode?<p className='text-danger' >{Reset.errors.resetCode}</p>:''}
        </div>
       
        <div className="col-md-12  text-end">
      <button type="submit" disabled={!(Reset.isValid && Reset.dirty)} className="btn btn-success">Verify
      {Loading?<span><i className='fa-solid text-light m-2  fa-spinner fa-spin'></i></span>:""} </button>
      </div>
      {error!==null ?<p className='text-danger'>{error}</p>:''}
        </div>
       </div>  
</div>
</form></div>
        
    </>
)
}
