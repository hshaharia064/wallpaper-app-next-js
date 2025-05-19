import { NextResponse } from "next/server";

const api_key = process.env.UNSPLASH_API_key

export async function GET(request){


const {searchParams} = new URL(request.url)
const perPage = searchParams.get('per_page') || '10'
const orientation = searchParams.get('orientation') || 'landscape'
const query = searchParams.get('query') || 'nature'



const url = new URL('https://api.unsplash.com/search/photos')
url.searchParams.set("order_by" , "popular")
url.searchParams.set("per_page" , perPage)
url.searchParams.set('orientation', orientation)
url.searchParams.set('query', query)


const response = await fetch(url,{
    headers : {
        Authorization : `Client-ID ${api_key}`
    }
})

if(!response.ok){
    return NextResponse.json({error : 'could not fetch the data'},
        {status : response.status}
    )
}

const data = await response.json()

const photos = data.results || []
const landScapImages = photos.filter(p=> p.width > p.height)
return NextResponse.json(landScapImages)
}