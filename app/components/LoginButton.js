export default function LoginButton(){

    const scopeArray = [
  'public',
  'read_user',
  'write_user',
  'read_photos',
  'write_photos',
  'write_likes',
  'read_collections',
  'write_collections'
].join(' ')

    

    const params = new URLSearchParams({
        client_id : process.env.NEXT_PUBLIC_UNSPLASH_API,
        redirect_uri : `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
        response_type : 'code',
    scope: scopeArray

    })

    const url = `https://unsplash.com/oauth/authorize?${params.toString()}`
    console.log(url)

    return(
        <div className="w-screen h-32  py-2 flex justify-center items-center">
            <a href={url}
                    className=" block flex items-center justify-center  rounded-2xl h-12  shadow-2xl w-72 text-xl  bg-cyan-950 text-white ">Login/Sign Up</a>

        </div>
    )
}