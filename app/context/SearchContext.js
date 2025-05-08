"use client"

import { useContext, createContext, useRef } from "react"

const searchContext = createContext()


export function SearchProvider({children}){
    const searchInputRef = useRef(null)


    return(
        <searchContext.Provider value={{searchInputRef}}>
            {children}
        </searchContext.Provider>
    )
}


export function useSearch(){
    return useContext(searchContext)
}