import axios from "axios";
import { createContext, useState } from "react";

export let CartContext=createContext();
export default function CartContextProvider(myprops){
    const[cartNumber ,setcartNumber]=useState(0)
    const [numberOfWish , setNumberOfWish] = useState(null)
    const[cartId ,setcartNumberId]=useState(null)
    let BaseUrl=`https://ecommerce.routemisr.com`;
    let  header={token:localStorage.getItem('userTonken')}
    function addToCart(id){
     
        return axios.post(`${BaseUrl}/api/v1/cart`,{productId:id},{
            headers:header
        })
        
    }
    function UpdateCart(id ,count){
   
        return axios.put(`${BaseUrl}/api/v1/cart/${id}`
        ,{count:count},
        {
            headers:header
        })
        
        
    }
    function DeleteCart(id ){
      
        return axios.delete(`${BaseUrl}/api/v1/cart/${id}` ,
        {headers:header})
    
  
        
    }
    function getCart(){
        try{
        return axios.get(`${BaseUrl}/api/v1/cart`,{
            headers:header
        })
    }
    catch(error){
        throw error;
    }
        
    }
    function CheckoutPayment(FormDate){
     
        return axios.post(`${BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
        ,{shippingAddress:FormDate},
        {
            headers:header
        })
        
    }
    async function cashPayment(shippingAddress) {
     
         return await axios.post(
           `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            shippingAddress ,
            {
              headers: { token: localStorage.getItem("userToken") },
            }
          );
    
       
      }
    
    async function AddWishList(productId) {
      
          return  axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId }, 
            {
                headers:header,
            }
          );
     
      }
    return <CartContext.Provider value={{ addToCart ,cartNumber,cashPayment,setNumberOfWish,numberOfWish,setcartNumber,getCart,DeleteCart,UpdateCart, AddWishList,CheckoutPayment,cartId,setcartNumberId}}>
      {myprops.children}
    </CartContext.Provider>
}
