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

            <Link href='/'>
            <House className="size-10 text-white focus:bg-cyan-800"/>
            </Link>
            <Link href='/favs'>
            <Star className="size-10  text-white" />
            </Link>

           <button onClick={handleSearchFocus}>

            <Search 
                    className="size-10  text-white" />
                    </button>
            <Link href='/login'>
               <SquareUser className="size-10  text-white"/>     
            </Link>
                    </div>
        </div>
    )
}