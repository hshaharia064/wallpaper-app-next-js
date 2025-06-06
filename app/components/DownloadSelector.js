'use client'
import { useState } from "react";
import { DownloadCloud } from "lucide-react";

export default function DownloadSelector({ photoId }) {
    const [selectedPhoto, setSelectedPhoto] = useState('regular');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);

        try {
            // Fix: Use absolute URL for API route
            const apiUrl = `/api/unsplash/download?photoId=${encodeURIComponent(photoId)}&quality=${encodeURIComponent(selectedPhoto)}`;
            
            const response = await fetch(apiUrl);
            console.log("Download API response:", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error (${response.status}): ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log("Download data:", data);

            if (!data?.downloadUrl) {
                throw new Error('No download URL received');
            }

            // Create download link
            const link = document.createElement('a');
            link.href = data.downloadUrl;
            link.download = `wallpixel-${photoId}-${selectedPhoto}.jpg`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            
            // Clean up after a delay
            setTimeout(() => {
                document.body.removeChild(link);
            }, 1000);

        } catch (err) {
            console.error('Download error:', err);
            alert(`Download failed: ${err.message}`);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col items-center px-4 w-full h-52 my-4">
            <select 
                name="photoQuality"
                className="w-60 bg-teal-600 active:bg-teal-700 text-white rounded-3xl px-5 rounded-bl-3xl h-12"
                onChange={(e) => setSelectedPhoto(e.target.value)}
                value={selectedPhoto}
                disabled={isDownloading}
            >
                <option value="raw">Raw Quality</option>
                <option value="full">Full Quality</option>
                <option value="regular">Regular Quality</option>
                <option value="small">Small Quality</option>
            </select>

            <button 
                className={`flex items-center justify-center gap-2 bg-teal-600 h-16 w-full mt-5 rounded-4xl text-white text-xl ${
                    isDownloading ? 'opacity-50 cursor-not-allowed' : 'active:bg-teal-700'
                }`}
                onClick={handleDownload}
                disabled={isDownloading}
            >
                {isDownloading ? (
                    <>
                        <span className="animate-spin">
                            <DownloadCloud size={24} />
                        </span>
                        Downloading...
                    </>
                ) : (
                    <>
                        <DownloadCloud size={24} />
                        Download
                    </>
                )}
            </button>
        </div>
    );
}