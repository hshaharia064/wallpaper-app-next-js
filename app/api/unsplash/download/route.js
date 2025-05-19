import { NextResponse } from "next/server";

export async function GET(request){
    const apiKey = process.env.UNSPLASH_API_key

    const {searchParams} = new URL (request.url)
    const photoId = searchParams.get('photoId')
    const quality = searchParams.get('quality') || 'regular'


    if(!photoId){
        return NextResponse.json({
            error : 'Invalid photo id'
        }, {
            status : 400
        })
    }


    try{
        const response = await fetch(`https://api.unsplash.com/photos/${photoId}`,{
            headers : {
                Authorization:` Client-ID ${apiKey}`
            }
        })

        if(!response.ok){
            return NextResponse.json({
                error : 'Failed to load image'
            },{
                status : response.status
            })
        }

        const data = await response.json()
        const downloadLocation = data.links.download_location
        const photoResponse = await fetch(downloadLocation,{
            headers:{
                Authorizatoin: `Client-ID ${apiKey}`
            }
        })

        const photoData = await photoResponse.json()

        


        const downloadUrl = data.urls[quality] || data.urls.regular
        return NextResponse.json({downloadUrl})

    }catch(err){
        return NextResponse.json( {error : 'Internal server error'}, {status : 500})
    }
}