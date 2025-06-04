import { NextResponse } from "next/server";

const api_key = process.env.NEXT_PUBLIC_UNSPLASH_API


export async function GET(request){
    const {searchParams} = new URL(request.url)
    const query = searchParams.get('query') || 'cats'
    const perPage = searchParams.get('per_page') || '30'
    const page = searchParams.get('page' || '1')
   

        
    let     url = new URL(`https://api.unsplash.com/search/photos`)
        url.searchParams.set('query', query)
        url.searchParams.set('per_page', perPage)
        url.searchParams.set('page', page)
    

    try{
        const response = await fetch(url.toString(),{
            headers : {
                Authorization : `Client-ID ${api_key}`
            }
        })

        // console.log(response.status);
        

        if(!response.ok){
            return NextResponse.json(
                {error : `Error in the api`},
                {status : response.status}
            )
        }


        const data = await response.json()
        // console.log(data);
        
        return NextResponse.json(data.results || [])

    }catch(error){
        console.log('unexpected error occured while fetching the data');
        return NextResponse.json(
            {error : 'internal server error'},
            {status : 500}
        )
        
    }
}