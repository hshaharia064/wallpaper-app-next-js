'use client'

import Image from "next/image";
// import Navbar from "./components/Navbar";
import { useSearch } from "./context/SearchContext";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {

  // const api_key = process.env.UNSPLASH_API_key
const [photos, setPhotos] = useState([])
const {searchInputRef} = useSearch()
const [lightMode, setLightMode] = useState(false)
// const API_url = 'https://api.unsplash.com/search/photos'

const toggleDarkMode = ()=>{
      setLightMode(!lightMode)
}

useEffect(()=>{
  async function loadMaal(){
    const res = await fetch(`/api/unsplash?query=cats&per_page=20`)
    const data = await res.json()
    setPhotos(data.results || [])
  }
  loadMaal()
},[])


// console.log(data);



  return (
    
    
    <div className="w-screen min-h-screen flex text-white flex-col items-center bg-gray-950 pb-20 ">
    <div className="container  h-24 flex justify-between px-8 items-center ">
      <p className="text-3xl font-semibold">Wallpixel</p> 
      <div className={`bg-cyan-950 rounded-bl-full rounded-br-full ${ lightMode? '' : 'shadow-2xl  shadow-white'} transition duration-300 ease-in-out top-0 w-12 h-20 relative overflow-hidden flex justify-center items-center `}>
        <div className={`flex w-28  justify-between absolute mt-6  items-center ${lightMode ? 'translate-x-[2.5rem]' : '-translate-x-[2.5rem]'} transition-all duration-200  `}
                        onClick={toggleDarkMode}>

        <Sun className="size-8 "/>
        <Moon className="size-8"/>
        </div>
      </div>

    </div>
      
          <form action=""
                className=" w-full py-4  gap-5 mt-5 flex justify-center">
            <input id="input" type="text"
            ref={searchInputRef}
            placeholder="Search photos..."
            className=" border-2 text-white border-gray-200 h-10 rounded-2xl w-60 outline-0 px-3" />

            <button className="bg-cyan-950 active:bg-cyan-900 transition duration-150 text-white w-24 rounded-2xl">Search</button>
          </form>

        <div className=" w-full grid grid-cols-2 gap-2  mt-5 p-5">
          {photos.map((photo)=>(
            <img src={photo.urls.small}
                  key={photo.id}
                   alt="img"
                   className="rounded-xl" />
          ))}
        </div>
         
        </div>
    
  );
}
