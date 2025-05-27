import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request, {params}){


    try{
        const {id} = params
        console.log({id});
        
        const storedCookies = await cookies()
        const tokenCookie = storedCookies.get('Unsplash_token')


        if(!tokenCookie?.value){
            return NextResponse.json({error : 'auth token not found'}, {status : 401})
        }

        const token = tokenCookie.value

        const response = await fetch(`https://api.unsplash.com/photos/${id}/like`,{
            method : 'POST',
            headers : {
                Authorization : `Bearer ${token}`,
                'Accept-Version' : 'v1'
            }
        })
        
        if(!response.ok){
            console.log('failed to like the photo', response.status)
            return NextResponse.json(
                {error : 'Failed to like the photo'},
                {status : response.status}
            )
        }


        const data = await response.json()

        return NextResponse.json({
            success : true, data
        })



     }catch(err){
        console.log('got the error while liking the photo')
        return NextResponse.json({
            error : 'Internal server error'
        },{
            status : 500
        })
    }
   
    
}






export async function DELETE(request, {params}){
    try{
        const {id} = await params
        const storedCookies = await cookies()
        const tokenCookie = storedCookies.get('Unsplash_token')

        if(!tokenCookie?.value){
            return NextResponse.json({
                error : 'No auth token found'
            },{
                status : 402
            })
        }
        const token = tokenCookie.value


        const response = await fetch(`https://api.unsplash.com/${id}/like`,{
            method : 'DELETE',
            headers : {
                Authorization : `Bearer ${token}`,
                'Accepted-version' : 'v1'
            }
        })


        if(!response.ok){
            console.log('failed to remove like')
            return NextResponse.json({
                error : 'Failed to remove like from the photo'
            },{
                status : response.status
            })

            
            
        }
        
                    const data = await response.json()
        
                    return NextResponse.json({success : true}, data)




    }catch(err){
        console.log('error while removing like')
        NextResponse.json({
            error : "internal server error"
        },{
            status : 500
        })
    }
}