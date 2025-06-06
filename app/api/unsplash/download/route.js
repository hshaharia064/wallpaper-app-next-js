import { NextResponse } from "next/server";

export async function GET(request) {
    const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_API;
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('photoId');
    const quality = searchParams.get('quality') || 'regular';

    // Moved this inside the function
    if (!photoId) {
        return NextResponse.json({
            error: 'Invalid photo id'
        }, {
            status: 400
        });
    }

    try {
        // 1. Get photo details
        const response = await fetch(`https://api.unsplash.com/photos/${photoId}`, {
            headers: {
                Authorization: `Client-ID ${apiKey}`
            }
        });

        if (!response.ok) {
            console.error("Photo fetch error:", response.status, response.statusText);
            return NextResponse.json({
                error: 'Could not get the photo'
            }, {
                status: response.status
            });
        }

        const data = await response.json();
        const downloadLocation = data.links.download_location;

        // 2. Track download (REQUIRED by Unsplash)
        await fetch(downloadLocation, {
            headers: {
                Authorization: `Client-ID ${apiKey}`
            }
        });

        // 3. Get actual download URL
        const downloadUrl = data.urls[quality] || data.urls.regular;
        console.log("Generated download URL:", downloadUrl);
        
        return NextResponse.json({ downloadUrl });

    } catch (error) {
        console.error("Download API error:", error);
        return NextResponse.json({ 
            error: 'Internal server error' 
        }, { 
            status: 500 
        });
    }
}