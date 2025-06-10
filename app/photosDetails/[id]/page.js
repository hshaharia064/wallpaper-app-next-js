import React from "react";
import Link from "next/link";
import { ArrowLeft,Camera, Album, MapPin } from "lucide-react";
import DownloadSelector from "@/app/components/DownloadSelector";

export default async function photoDetails({params}){


    const api_key = process.env.NEXT_PUBLIC_UNSPLASH_API
    const {id} = await params;
try{

    const response = await fetch(`https://api.unsplash.com/photos/${id}`,
        {
            headers : {
                Authorization :` Client-ID ${api_key}`,
            }
        }
    )
    
    if(!response.ok){
        console.log(response.status)
        return <div>
            photo not found or unable to fetch data 
        </div>
    }
    
  
const data = await response.json()




// console.log(data);

    return(
        <div className="w-screen bg-gray-100 dark:bg-gray-950 flex flex-col min-h-screen ">
             <div className="bg-cyan-950 w-full flex items-center px-5 text-xl lg:hidden font-medium text-white h-16 top-0">
              <Link href="/" className="flex items-center gap-1 active:bg-cyan-900 rounded-2xl px-2 py-1">
              <ArrowLeft/> Back
              </Link>
             </div>
           <div className="w-full h-[60vh] p-4 flex pt-10 mb-20 justify-center">
        <a href={data.urls.regular}>

            <img src={data.urls.regular} alt="Photo"
            className="max-h-[60vh] max-w-[90vw] shadow-black object-cover shadow-2xl rounded-xl" />
            </a>
            </div>

            <div className=" min-h-60 flex p-4  items-center justify-center mb-20 mt-5  w-full">
                 <div className="bg-white dark:bg-cyan-900 dark:text-white p-5  text-gray-700 flex flex-col gap-2 rounded-2xl shadow-2xl min-h-52  w-full">
                    <p className="font-medium text-shadow-2xs flex items-center text-xl">
                        <Camera/>  : {data.user.first_name} </p>
                    <p className="font-medium text-shadow-2xs flex items-center text-xl">
                        <MapPin/>  : {data.user.location || "Unavailable"} </p>
                    <p className="font-medium text-shadow-2xs flex items-center   text-xl">
                        <Album className="mb-auto mt- size-7 mr-2"/>  : {data.alt_description || "Description unavailable"} </p>
                 </div>
            </div>

<div className=" mb-10">

    
           <DownloadSelector photoId={data.id}/>
</div>
           


        </div>
    )
  
}catch(err){
    return( <div>Unable to fetch</div>
        
    )
}
}