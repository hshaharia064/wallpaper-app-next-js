'use client';

export default function LoginButton() {
  // 1. Build a space-delimited scope string with correct Unsplash scope values
  const scopeArray = [
    'public',
    'read_user',
    'read_photos',
    'write_likes',
    'read_collections'
  ].join(' ');  // Unsplash requires + delimiter, not space

  // 2. Build the URLSearchParams
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_UNSPLASH_API,   // your Access Key
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/unsplash/auth/callback`,
    response_type: 'code',
    scope: scopeArray,
    prompt: 'login',                                   // optional: always show login/consent
  });

  const url = `https://unsplash.com/oauth/authorize?${params.toString()}`;
  console.log('OAuth URL →', url);

  return (
    <div className="w-screen h-32 py-2 flex justify-center items-center">
      <a
        href={url}
        className="block flex items-center justify-center rounded-2xl h-12 shadow-2xl w-72 text-xl bg-cyan-950 text-white"
      >
        Login / Sign Up
      </a>
    </div>
  );
}