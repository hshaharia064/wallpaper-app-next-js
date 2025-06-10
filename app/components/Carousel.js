
"use client"


import { useState, useEffect } from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import {Autoplay, Navigation, Pagination} from "swiper/modules"



export default function Carousel(){

const [photos, setPhotos] = useState([])





useEffect(()=>{
async function loadImages(){
   const res = await fetch(`/api/unsplash/banner?per_page=10&orientation=landscape`)
    const data = await res.json()
    setPhotos(data)

}

loadImages()

},[])


console.log('hi')

    return(
        <div className="w-screen  h-72 mt-10 lg:h-[88vh] lg:flex justify-center items-center  mx-auto  pt-2">
            <Swiper modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            loop
            pagination={{clickable : true}}
            navigation
            autoplay={{delay : 2000, disableOnInteraction : false}}>


                {photos.length > 0 && photos.map((p)=>(
                    <SwiperSlide key={p.id} className="h-full w-full px-4  ">
                       


                    <img src={p.urls.regular} alt="photo"
                    className="object-cover shadow-black shadow-2xl border-cyan-800/75 border-2 w-full lg:w-[80vw] mx-auto h-56 lg:h-[80vh] rounded-2xl " />
                    
                    </SwiperSlide>
                ))}

            </Swiper>


        </div>
    )
}