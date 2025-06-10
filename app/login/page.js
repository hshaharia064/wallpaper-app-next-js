import Link from "next/link"
import { User, ChevronLeft } from "lucide-react"
import LoginButton from "../components/LoginButton"

export default function login(){



    return(
        <div className="min-h-screen min-w-screen pb-32  flex flex-col  bg-gray-100 dark:bg-gray-950 overflow-hidden">
            <div className="min-w-screen h-16 flex items-center px-5 text-white bg-cyan-950">
                <Link href='/' 
                      className="active:bg-cyan-900 flex items-center text-xl px-2 py-1 rounded-full">
                       <ChevronLeft className="size-7"/> Back</Link>
            </div>


                <div className="min-h-  min-w-screen my-auto  flex justify-center ">

                      <div className="bg-white dark:bg-cyan-950 shadow-md flex  w-36 h-36 items-center  justify-center rounded-full p-3 ">
                        <User className="text-cyan-900 dark:text-white size-16"/>
                        </div>  
                        


                </div>
                <div className="mx-auto pb-40">

                    <LoginButton />
                </div>
        </div>
    )
}