'use client'

import { House} from "lucide-react"
import { Star } from "lucide-react"
import { Search } from "lucide-react"
import Link from "next/link"
import { useSearch } from "../context/SearchContext"

export default function Navbar(){

    const {searchInputRef} = useSearch()
    
    const handleSearchFocus = ()=>{
        searchInputRef.current?.focus()
    }


    return(
        <div className="bg-cyan-950 w-full flex items-center justify-between px-7 gap-6  h-20 bottom-0 left-0 fixed z-50">
            <Link href='/'>
            <House className="size-10 text-white"/>
            </Link>
            <Link href='/favs'>
            <Star className="size-10  text-white" />
            </Link>

           <button onClick={handleSearchFocus}>

            <Search 
                    className="size-10  text-white" />
                    </button>
        </div>
    )
}