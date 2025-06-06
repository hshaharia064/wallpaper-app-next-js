import { DownloadCloud } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET(request){
    const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_API


    const {searchParams} = new URL(request.url)
    const photoId = searchParams.get('photoId')
    const quality = searchParams.get('quality') || 'regular'
}


if(!photoId){
    return NextResponse.json({
        error : 'Invalid photo id'
    },{
        status : 400
    })
}

try{
   
    const response = await fetch(`https://api.unsplash.com/photos/${photoId}`,{
        headers : {
            Authorization : `Client-ID ${apiKey}`
        }
    })

    if(!response.ok){
        return NextResponse.json({
            error : 'Could not get the photo'
        },{
            status : response.status
        })
    }

const data = await response.json()

const downloadLocation = data.links.download_location

await fetch(downloadLocation, {
    headers : {
        Authorization : `Client-ID ${apiKey}`
    }
})

const downloadUrl = data.urls[quality] || data.urls.regular

return NextResponse.json({downloadUrl})


}catch(error){

}