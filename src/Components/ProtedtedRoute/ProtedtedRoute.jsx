import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtedtedRoute(myProps) {
  if(localStorage.getItem('userTonken')!==null){
    return myProps.children;
  }
  else{
    return <Navigate to ='/Login'/>;
  }

}
