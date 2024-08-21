
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Master from './Components/Master/Master';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Notfount from './Components/Notfount/Notfount';
import Details from './Components/Details/Details';
import Cart from './Components/Cart/Cart';
import Product from './Components/Product/Product';
import Category from './Components/Category/Category';
import UserContextProvider from './context/CouterContext';
import ProtedtedRoute from './Components/ProtedtedRoute/ProtedtedRoute';
import  CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import Checkout from './Components/Checkout/Checkout';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import WishList from './Components/WishList/WishList';
import Allorders from './Components/Allorders/Allorders';



const router= createBrowserRouter([
  {path:'' ,element:<Master/>,children:[
    {path:'Login' ,element:<Login/>},
    {path:'Register' ,element:<Register/>},
    {path:'Forget' ,element:<ForgetPassword/>},
    {path:'Reset' ,element:<ResetPassword/>},
    {path:'Home' ,element:<ProtedtedRoute><Home/></ProtedtedRoute>},
    {path:'Brands' ,element:<ProtedtedRoute><Brands/></ProtedtedRoute>},
    {path:'Details/:id' ,element:<ProtedtedRoute><Details/></ProtedtedRoute>},
    {path:'Cart' ,element:<ProtedtedRoute><Cart/></ProtedtedRoute>},
    {path:'Product' ,element:<ProtedtedRoute><Product/></ProtedtedRoute>},
    {path:'Checkout' ,element:<ProtedtedRoute><Checkout/></ProtedtedRoute>},
    {path:'Category' ,element:<ProtedtedRoute><Category/></ProtedtedRoute>},
    {path:'wishList' ,element:<ProtedtedRoute><WishList/></ProtedtedRoute>},
    {  path : "/allorders" , element : <ProtedtedRoute> <Allorders/>  </ProtedtedRoute>},
    {path:'*' ,element:<Notfount/>},
  ]}
])
function App() {
  return (
    <div className="App">
      <CartContextProvider>
            <UserContextProvider>
              <RouterProvider router={router}>
              <ToastContainer/>
                </RouterProvider>
                </UserContextProvider>
                </CartContextProvider>
    
    </div>
  );
}

export default App;
