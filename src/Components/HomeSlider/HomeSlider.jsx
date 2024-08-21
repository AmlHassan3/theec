import React from 'react'
import Slider from "react-slick";

import img2 from '../../assets/img/grocery-banner-2.jpeg'
import img4 from '../../assets/img/blog-img-2.jpeg'
import img3 from '../../assets/img/banner-4.jpeg'
import img5 from '../../assets/img/blog-img-1.jpeg'
import img6 from '../../assets/img/slider-2.jpeg'
import img7 from '../../assets/img/grocery-banner.png'
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <div className='row gy-5'>
 <div className='col-md-8'> <Slider {...settings}>
  
     <img src={img2} height={350} alt='img1'/>
     <img src={img3} height={350} alt='img1'/>
     <img src={img4} height={350} alt='img1'/>
     <img src={img5} height={350} alt='img1'/>
   
   </Slider></div>
     
      <div className='col-md-4'>
      <img src={img6} height={175} className='w-100' alt='img1'/>
      <img src={img7} height={175} className='w-100'alt='img1'/>

      </div>
    </div>
  )
}
