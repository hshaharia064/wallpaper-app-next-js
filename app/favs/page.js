import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
// import { redirect } from "next/dist/server/api-utils"
import { redirect } from "next/navigation"

export default async function favs(){

const storedCookies = cookies()
const token = storedCookies.get('Unsplash_token')?.value

if(!token){
    redirect('/login')
}


const response = await fetch('https://api.unsplash.com/me/likes',{
    headers : {
         Authorization: `Bearer ${token}`
    }
})

if(!response.ok){
    console.log("failed to fetch user data via token")
    return(
        <p>Unable to load the favorite page</p>
    )
}

const photos = await response.json()


    return(
        <div className="w-screen min-h-screen flex flex-col  dark:text-black bg-gray-200 pb-20  text-white">
           <div className="w-full bg-cyan-950 h-16 flex items-center px-8">
                <Link href='/' className="flex items-center  active:bg-cyan-900 transition duration-100 ease-in px-2 py-1 rounded-3xl">
                <ChevronLeft className="size-7"/> 
                <p className="text-xl">
                    Back
                    </p>
                </Link>
           </div>

           <div className="flex mt-5  px-5 py-5">
            <p className="text-xl mr-auto  font-semibold text-black">Your liked images : </p>
           </div>
           <span className="h-[0.5px] bg-gray-400 w-[90%] mx-auto mb-5"></span>

           <div>

           </div>
        </div>
    )
}