import React, { useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/CouterContext'
import { CartContext } from '../../context/CartContext'

export default function Navbor() {
  let{ cartNumber,getCart,setcartNumber} =useContext(CartContext)
  let{userToken , setToken}=  useContext(userContext)
  const{userData }=useContext(userContext)
  
  async function getbycart(){
    let data= await getCart();
    setcartNumber(data.data.numOfCartItems)

  }
useEffect(()=>{ getbycart()
},[])
  let navigate=useNavigate();
  function logout(){
    localStorage.removeItem('userTonken');
    setToken(null)
    navigate('/Login');
  }
  return (
    <>
    <nav id="navbar-example" className={`navbar pt-3 pb-1  navbar-expand-lg  navbar-light    ` } >
              
              <div className="container">
         
              <a className="navbar-brand" href="#"><i className='fa-solid fa-cart-shopping text-warning fa-2x'> </i> <span>freshCart</span></a>
                 
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
              
              <div className="collapse navbar-collapse" id="navbarNavDropdown"> 
              {userToken!==null?
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                 
                  <li className="nav-item ">
                      <Link className="nav-link active" to='Home'>Home </Link>
                  </li>
                  <li className="nav-item ">
                      <Link className="nav-link" to='Brands'>Brands </Link>
                  </li>
                 
                  <li className="nav-item ">
                      <Link className="nav-link" to='Product'>Product </Link>
                  </li>
                  <li className="nav-item ">
                      <Link className="nav-link" to='Category'>Category </Link>
                  </li>
              </ul>
              :''}
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {userToken==null?
              <>
                  <li className="nav-item ">
                      <Link className="nav-link" to='Register'> Register</Link>
                  </li>
                  <li className="nav-item ">
                      <Link className="nav-link" to='Login'> Login</Link>
                  </li>  </> :''
                  }
                  {userToken!==null?
                  <>
                  <li className="nav-item d-flex align-items-center text-main">
                    <i className='fa-brands fa-facebook mx-3'></i>
                  <i className='fa-brands fa-twitter mx-3'></i>
                      <i className='fa-brands fa-instagram mx-3'></i>
                <i className='fa-brands fa-linkedin mx-3'></i>
        </li>
        <li className="nav-item ">
                      <Link className="nav-link text-warning" to='Cart'><i className='fa-solid fa-shopping-cart '></i> 
                      <span className='badge text-warning '>
                        {cartNumber}</span></Link>
                  </li>
                  <li className="nav-item "onClick={()=>{logout()}}>
                   <a className="nav-link "> Logout</a>
                  </li> </>  :''}
                  </ul>
      </div>
  </div>
  
</nav>
      
    </>
  )
}
