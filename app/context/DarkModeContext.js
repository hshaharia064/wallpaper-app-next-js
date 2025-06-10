'use client'


import { createContext, useContext, useState, useEffect } from "react"


const ThemeContext = createContext()


export  function ThemeProvider({children}){

    const [darkMode, setDarkMode] = useState(()=>{
        if(typeof window !== 'undefined'){
            const saved = localStorage.getItem('darkMode')

            return saved !==null ? JSON.parse(saved) : true
        }
        return true
    })


    useEffect(()=>{
            localStorage.setItem('darkMode', JSON.stringify(darkMode))
            document.documentElement.classList.toggle('dark', darkMode)
    },[darkMode])


    const toggleDarkMode = ()=>{
        setDarkMode(prev => !prev)
    }

    return(
        <ThemeContext.Provider value= {{darkMode, toggleDarkMode}}>

            {children}



        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext)