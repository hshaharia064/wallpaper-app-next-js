"use client"
import { Star, Type } from "lucide-react"
import { useState } from "react"

export default function LikeTemplate({photoId, initialLiked= false, onClickChange}){

 const [isLiked, setIsLiked] = useState(initialLiked)

const handleLike = async()=>{
    
    try{
        const method = isLiked ? 'DELETE' : 'POST'
        const response = await fetch(`/api/LikePhotos/${photoId}/like`,{
            method : method,
            headers : {
                'Content-Type' : 'application/json',

            }
        })

        if(response.ok){
            const newLikedState = !isLiked
            setIsLiked(newLikedState)

        }else {
            console.log('failed to like the image');
            
        }
    }catch(err){
        console.log('Unable to fetch Like');
        
    }
 }

    return(

<div className="w-full p-4 absolute bottom-0  text-gray-100">
    <button 
            onClick={handleLike}>

    <Star className= {`text-shadow-2xs size-8 stroke-2  ${isLiked ? 'fill-red-600/80' : ''}`}
    />
    </button>
    
</div>

    )
}