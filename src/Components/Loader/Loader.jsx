import React from 'react'
import { ColorRing } from 'react-loader-spinner'
export default function Loader() {
  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 position-fixed top-0 start-0 end-0 bottom-0 `}>
    <ColorRing
      visible={true}
      height={80}
      width={80}
      ariaLabel="color-ring-loading"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
      
    </div>
  )
}
