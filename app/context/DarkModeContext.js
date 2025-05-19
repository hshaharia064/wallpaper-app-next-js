"use client"
import {children, createContext, useContext, useState} from 'react'


const themeContext = createContext()


export function ThemeProvider({children}){
    const [darkMode, setDarkMode] = useState(true)
    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode)
    }


    return(
        <themeContext.Provider value={{darkMode,toggleDarkMode}}>
                {children}
        </themeContext.Provider>
    )
}


export const useTheme = ()=> useContext(themeContext)