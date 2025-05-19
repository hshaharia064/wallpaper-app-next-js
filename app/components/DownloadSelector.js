"use client"
import { useState } from "react"

export default function DownloadSelector({photoId}){

    const [selectedPhoto, setSelectedPhoto] = useState('regular')


    const handleDownload = async ()=>{
       try{ 
            const response = await fetch(`/api/download?photoId=${photoId}&quality=${selectedPhoto}`)
            const data = await response.json()

            if(!data?.downloadUrl){

                alert('The download link is not working please try again later')
            }


            const link = document.createElement('a')
             link.href = data.downloadUrl
             link.download = `photo-${selectedPhoto}`
             document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
    
    
        }catch(err){
            alert('Download failed try again later')
        }
    }


    return(
        <div className=" flex flex-col items-center  px-4  w-full h-52 my-4">
            <select name="photoQuality" id=""
                    className="w-60 bg-teal-600  active:bg-teal-700 text-white rounded-3xl px-5 rounded-bl-3xl h-12"
                    onChange={(e)=> setSelectedPhoto(e.target.value)}
                    value={selectedPhoto}>
                <option value="raw">Raw Quality</option>
                <option value="full">Full Quality</option>
                <option value="regular">Regular Quality</option>
                <option value="small">Small Quality</option>
               
            </select>
            <button className="bg-teal-600 h-16 w-full mt-5 rounded-4xl active:bg-teal-700  text-white text-xl"
            onClick={handleDownload} >Downlaod</button>
        </div>
    )
}