import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function favs() {
  const storedCookies = await cookies();
  const tokenCookie = storedCookies.get('Unsplash_token');
  
  if (!tokenCookie?.value) {
    redirect('/login');
  }

  const token = tokenCookie.value; // Extract the actual token value
  console.log('Token being used:', token);

  try {
    const userResponse = await fetch(`https://api.unsplash.com/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Version': 'v1', // Add this header for Unsplash API
      }
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.log('Failed to fetch user data (me):', userResponse.status, errorText);
      return <p className="p-4 text-red-600">Failed to fetch user data: {errorText}</p>;
    }

    console.log('User response status:', userResponse.status);
    const user = await userResponse.json();
    console.log('User data:', user.username);

    const userLikes = await fetch(`https://api.unsplash.com/users/${user.username}/likes?per_page=30`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Version': 'v1', // Add this header for Unsplash API
      }
    });

    if (!userLikes.ok) {
      const errorText = await userLikes.text();
      console.log('Could not fetch userLikes:', userLikes.status, errorText);
      return <p className="p-4 text-red-600">Having trouble fetching likes: {errorText}</p>;
    }

    const photos = await userLikes.json();
    console.log('Number of liked photos:', photos.length);

    return (
      <div className="w-screen min-h-screen flex flex-col bg-gray-200 pb-20 text-black">
        <div className="w-full bg-cyan-950 h-16 flex items-center px-8">
          <Link href="/" className="flex items-center text-white px-2 py-1 rounded-3xl">
            <ChevronLeft className="size-7" />
            <span className="ml-2 text-xl">Back</span>
          </Link>
        </div>

        <div className="flex mt-5 px-5 py-5">
          <h1 className="text-xl font-semibold">Your liked images ({photos.length}):</h1>
        </div>
        <span className="h-[0.5px] bg-gray-400 w-[90%] mx-auto mb-5"></span>

        {photos.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">
            No liked photos found. Try liking some photos on Unsplash first!
          </p>
        ) : (
          <div className="Mason-div gap-3 mt-5 my-5 px-5">
            {photos.map(photo => (
              <img
                key={photo.id}
                src={photo.urls.small}
                alt={photo.alt_description || 'Liked photo'}
                className="rounded-xl shadow-2xl child-img mt-3 object-cover"
              />
            ))}
          </div>
        )}
      </div>
    );

  } catch (error) {
    console.error('Error in favs page:', error);
    return <p className="p-4 text-red-600">An unexpected error occurred: {error.message}</p>;
  }
}