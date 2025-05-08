import { LucideArrowLeft } from "lucide-react"
import Link from "next/link"


export default function favs(){


    return(
        <div className="w-screen min-h-screen flex flex-col items-center bg-gray-950 pb-20  text-white">
           <div className="w-full bg-cyan-950 h-28 flex items-center px-8">
                <Link href='/' className="flex items-center gap-3 active:bg-cyan-900 transition duration-100 ease-in px-2 py-1 rounded-3xl">
                <LucideArrowLeft className="size-10"/> 
                <p className="text-xl">
                    Back
                    </p>
                </Link>
           </div>
        </div>
    )
}