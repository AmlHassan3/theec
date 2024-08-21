import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";


export let userContext=createContext();

export default function UserContextProvider(myprops){
const [userToken,setToken]=useState(null);
const [userData,setData]=useState(null);
function getUserData(){
    const userData=jwtDecode(localStorage.getItem('userTonken'))
    setData(userData)
}
return <userContext.Provider value={{userData,setToken,userData,userToken ,getUserData}}>
{myprops.children}
</userContext.Provider>
}