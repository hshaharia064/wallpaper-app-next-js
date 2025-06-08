'use client'

import { House} from "lucide-react"
import { Star } from "lucide-react"
import { Search } from "lucide-react"
import { SquareUser } from "lucide-react"
import Link from "next/link"
import { useSearch } from "../context/SearchContext"

export default function Navbar(){

    const {searchInputRef} = useSearch()
    
    const handleSearchFocus = ()=>{
        searchInputRef.current?.focus()
    }


    return(
        <div className="flex justify-center">
            <div className="bg-cyan-950 w-[90%] flex items-center justify-between px-7 gap-6 rounded-full bottom-4  h-16  fixed z-50">

            <div className="flex flex-col items-center">

            <Link href='/'>
             <House className="size-8 text-white"/>
            <p className="text-white font-light text-sm ">Home</p>
            </Link>
            </div>

            <div  className="flex flex-col items-center">

            <Link href='/favs'>
            <Star className="size-8  text-white" />
              <p className="text-white font-light text-sm">Favs</p>
            </Link>
            </div>

           <button onClick={handleSearchFocus}
           className="flex flex-col items-center">
             <Search 
                    className="size-8  text-white" />
                      <p className="text-white font-light text-sm">Search</p>
                    </button>

            
            <Link href='/login'
             className="flex flex-col items-center">
               <SquareUser className="size-8  text-white"/> 
                 <p className="text-white font-light text-sm">Profile</p>    
            </Link>
                    </div>
        </div>
    )
}