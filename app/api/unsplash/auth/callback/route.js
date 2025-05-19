import { NextResponse } from "next/server";


export async function GET(request){
    const {searchParams} = new URL(request.url)
    const code = searchParams.get('code')
    if(!code){
        return NextResponse.redirect('/?error=missing_code')
    }

    const Token = await fetch(`https://unsplash.com/oauth/token`,{

        method : "Post",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify({
            client_id : process.env.UNSPLASH_API_key,
            client_secret : process.env.SECRET_KEY,
            redirect_uri : `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
            code,
            grant_type : "authorization_code"
        })

        
    
    })

    if(!Token.ok){
        console.log('token response failed')
        return NextResponse.redirect('/?error=token failed')

    }

    const {access_token} = await Token.json()

    const res = NextResponse.redirect('/')

    res.cookies.set('Unsplash_token', access_token,{
        httpOnly : true,
        path : '/',
          maxAge: 60 * 60 * 24 * 30,
    })

    return res
}