import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=missing_code', process.env.NEXT_PUBLIC_APP_URL));
  }

  console.log("Received authorization code:", code);
  // console.log(`redirect url : ${process.env.}`)
  // console.log("Redirecting to favs →", `${process.env.NEXT_PUBLIC_APP_URL}/favs`);


  // Exchange code for access token
  const tokenRes = await fetch('https://unsplash.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_UNSPLASH_API,
      client_secret: process.env.SECRET_KEY,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/unsplash/auth/callback`,
      code,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    console.error('Token exchange failed:', tokenRes.status, errorText);
    return NextResponse.redirect(new URL(`/?error=token_failed&status=${tokenRes.status}`, process.env.NEXT_PUBLIC_APP_URL));
  }

  const tokenJson = await tokenRes.json();
  if (!tokenJson.access_token) {
    console.error('No access token in response:', tokenJson);
    return NextResponse.redirect(new URL('/?error=no_token', process.env.NEXT_PUBLIC_APP_URL));
  }

  const access_token = tokenJson.access_token;
  console.log('Got access token:', access_token);

  // Redirect to /favs with cookie set
 const response = NextResponse.redirect('https://wallpixel-wallpaper-app.vercel.app/favs');

  response.cookies.set('Unsplash_token', access_token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  return response;
}