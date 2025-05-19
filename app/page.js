'use client'

import Image from "next/image";
// import Navbar from "./components/Navbar";
import { useSearch } from "./context/SearchContext";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./context/DarkModeContext";
import Carousel from "./components/Carousel";
import Link from "next/link";

export default function Home() {

  // const api_key = process.env.UNSPLASH_API_key
const [photos, setPhotos] = useState([])
const {searchInputRef} = useSearch()
// const [DarkMode, setDarkMode] = useState(true)
const [query, setQuery] = useState('photos')

const {darkMode, toggleDarkMode} = useTheme()
// const API_url = 'https://api.unsplash.com/search/photos'


useEffect(()=>{
  async function loadMaal(){
    const res = await fetch(`/api/photo?query=${query}&per_page=30`)
    const data = await res.json()
    setPhotos(data || [photos])
  }
  loadMaal()
},[query])


// console.log(data);



const handleSubmit = (e)=>{
    e.preventDefault()
   const val = searchInputRef.current.value.trim();
    if (val) {
      setQuery(val)
   
  }
}


  return (
    
    
    
    <div className={`w-screen min-h-screen bg-gray-100 ${darkMode ? 'dark' : ''}dark:bg-gray-900 flex text-white flex-col items-center  pb-20`}>
    <div className="container  h-24 flex justify-between px-8 items-center dark:bg-red-500 ">
      <p className="text-3xl text-black font-semibold">Wallpixel</p> 
      <div className={`bg-cyan-950 rounded-bl-full rounded-br-full  transition duration-300 ease-in-out top-0 w-12 h-20 relative overflow-hidden flex justify-center items-center `}>
        <div className={`flex w-28  justify-between absolute mt-6  items-center ${darkMode ? 'translate-x-[2.5rem]' : '-translate-x-[2.5rem]'} transition-all duration-200  `}
                     onClick={toggleDarkMode} >

        <Sun className="size-8 "/>
        <Moon className="size-8"/>
        </div>
      </div>

    </div>
      
          <form onSubmit={handleSubmit}
                className=" w-full py-4  gap-5 mt-5 flex justify-center">
            <input id="input" type="text"
            ref={searchInputRef}
            placeholder="Search photos..."
            className=" border-2 text-black border-cyan-950 h-10 rounded-2xl w-60 outline-0 px-3"
            // value={query}
            />

            <button className="bg-cyan-950 active:bg-cyan-900 transition duration-150 text-white w-24 rounded-2xl"
            type="submit">Search</button>
          </form>
          
          <span className="h-[.06rem] shadow-2xl  bg-gray-900 w-[90%] mt-7"></span>

            <Carousel/>
         

        <div className=" Mason-div gap-3 mt-5 my-5 px-5">
             {photos.map((photo)=>(
              <Link href={`/photosDetails/${photo.id}`}
              key={photo.id}>
            <img src={photo.urls.regular}
                  
                  alt="img"
                  className="rounded-xl shadow-2xl child-img mt-3 shadow-white" />
                  </Link>
          ))}
        </div>
         
        </div>

        
    
  );
}
