'use client'

import { useState } from "react"

export default function DownloadSelector({ photoId }) {

    const [selectedPhoto, setSelectedPhoto] = useState('regular')
    const [isDownloading, setIsDownloading] = useState(false)


    const handleDownload = async () => {
        setIsDownloading(true)

        try {
            const response = await fetch(`/api/unsplash/download?photoId=${photoId}&quality=${selectedPhoto}`)

            if (!response.ok) {
                throw new Error(`api error : ${response.status}`)
            }


            const data = await response.json()

            if (!data?.downloadUrl) {
                throw new Error(`Unable to download`)
            }


            const link = document.createElement('a')
            link.href = data.downloadUrl
            link.download = `Wallpixel-${photoId}-${selectedPhoto}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild('link')



        } catch (err) {
            console.log('Error downloading the image')
            alert('Something went wrong')

        } finally {
            setIsDownloading(false)
        }
    }


    return (
        <div className="flex flex-col items-center px-4 w-full h-52 my-4">
            <select name="photoQuality"
                className="w-60 bg-teal-600 active:bg-teal-700 text-white rounded-3xl px-5 rounded-bl-3xl h-12"
                onChange={(e) => selectedPhoto(e.target.value)}
                value={selectedPhoto}
                disabled={isDownloading}>
                <option value="raw">Raw Quality</option>
                <option value="full">Full Quality</option>
                <option value="regular">Regular Quality</option>
                <option value="small">Small Quality</option>
            </select>

            <button  className={`bg-teal-600 h-16 w-full mt-5 rounded-4xl text-white text-xl ${
                    isDownloading ? 'opacity-50 cursor-not-allowed' : 'active:bg-teal-700'
                } ${isDownloading ? 'animate-spin' : ''}` }
                onClick={handleDownload}
                disabled={isDownloading}>
                    {isDownloading ? 'Downloading...' : 'Download'}

            </button>

        </div>
    )
}