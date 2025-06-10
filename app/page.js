'use client'

import Image from "next/image";
// import Navbar from "./components/Navbar";
import { useSearch } from "./context/SearchContext";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "./context/DarkModeContext";
import Carousel from "./components/Carousel";
import Link from "next/link";
import LikeTemplate from "./components/LikeTemplate";

export default function Home() {

const [photos, setPhotos] = useState([])
const [loading, setLoading] = useState(false)
const [hasMore, setHasMore] = useState(true)
const [page, setPage] = useState(1)
const [error, setError] = useState(null)


const {searchInputRef} = useSearch()
const [query, setQuery] = useState('photos')
// const [darkMode, setDarkMode] = useState(false)




const loadingRef = useRef(false)

const resetPagination = ()=>{
  setPhotos([])
  setHasMore(true)
  setPage(1)
  setError(null)
}


const loadPhotos = useCallback(async(currentPage, searchQuery, isNewSearch = false)=>{

  if(loadingRef.current) return

  loadingRef.current = true
  setLoading(true)
  setError(null)


  try{

    const response = await fetch(`/api/photo?query=${searchQuery}&per_page=30&page=${currentPage}`)

    if(!response.ok){
      
      throw new Error(`Error occured while requesting fetch ${response.status}`)
 }

 const data = await response.json()
 console.log(data)

 if(isNewSearch){
  setPhotos(data || [])
 }else{
  setPhotos(prev=> [...prev,...(data || [])])
 }


 if(!data || data.length<30){
  setHasMore(false)
 }



  }catch(error){

    console.error('error loading photos', error)
    setError('Failed to load photos')

  }finally{
    loadingRef.current = false
    setLoading(false)
  }



},[])


useEffect(()=>{
resetPagination()
loadPhotos(1, query, true )
},[query, loadPhotos])


useEffect(()=>{
if(page > 1){
  loadPhotos(page, query, false)

}
},[page])


const handleScroll = useCallback(()=>{
  if(loadingRef.current || !hasMore) return

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight


  if(scrollTop + windowHeight >= documentHeight - 300){
    setPage(prev=> prev + 1)
  }
},[hasMore])


useEffect(()=>{
  window.addEventListener('scroll', handleScroll)
  return ()=> window.removeEventListener('scroll', handleScroll)
},[handleScroll])

const handleSubmit = (e)=>{
  e.preventDefault()
  const val = searchInputRef.current.value.trim()
  if(val){
    setQuery(val)
  }
}


// const toggleDarkMode = ()=>{
//   setDarkMode(!darkMode)

// }


const {darkMode, toggleDarkMode} = useTheme()
 return (
    <div className={`w-screen min-h-screen  ${darkMode ? 'dark' : ''}dark:bg-gray-900 flex text-white flex-col items-center pb-20`}>
      <div className="container h-24 flex justify-between px-8 items-center ">
        <p className="text-3xl text-black dark:text-white font-semibold">Wallpixel</p>
        <div className={`bg-cyan-950 rounded-bl-full rounded-br-full transition duration-300 ease-in-out top-0 w-12 h-20 relative overflow-hidden flex justify-center items-center`}>
          <div className={`flex w-28 justify-between absolute mt-6 items-center ${darkMode ? 'translate-x-[2.5rem]' : '-translate-x-[2.5rem]'} transition-all duration-200`}
               onClick={toggleDarkMode}>
            <Moon className="size-8" />
            <Sun className="size-8" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}
            className="w-full py-4 gap-5 mt-5 flex justify-center">
        <input id="input" type="text"
               ref={searchInputRef}
               placeholder="Search photos..."
               className="border-2 text-black dark:text-white border-cyan-950 dark:border-cyan-600 h-10 rounded-2xl w-60 outline-0 px-3"
        />
        <button className="bg-cyan-950 active:bg-cyan-900 dark:bg-cyan-600/40 dark:border-2 dark:border-cyan-600 transition duration-150 text-white w-24 rounded-2xl" 
                type="submit">Search</button>
      </form>

      <span className="h-[.06rem] shadow-2xl bg-gray-900 w-[90%] mt-7"></span>
      <Carousel />

      <div className="Mason-div gap-3 mt-5 my-5 px-5">
        {photos.map((photo) => (
          <div className="relative" key={photo.id}>
            <Link href={`/photosDetails/${photo.id}`}>
              <Image src={photo.urls.regular}
                   alt="img"
                   width={500}
                   height={300}
                  //  placeholder={data.urls.thumb}
                  quality={70}
                   className="rounded-xl shadow-2xs child-img mt-3 shadow-white" />
            </Link>
            <LikeTemplate
              photoId={photo.id}
              initialLiked={false}
              onLikeChange={(id, liked) => console.log(`Photo ${id} ${liked ? 'liked' : 'unliked'}`)}
            />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-950"></div>
          <span className="ml-3 text-black dark:text-white">Loading more photos...</span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null)
              loadPhotos(page, query, false)
            }}
            className="bg-cyan-950 hover:bg-cyan-900 text-white px-6 py-2 rounded-2xl transition duration-150"
          >
            Try Again
          </button>
        </div>
      )}

      {/* End of results indicator */}
      {!hasMore && photos.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No more photos to load</p>
        </div>
      )}
    </div>
  );
}