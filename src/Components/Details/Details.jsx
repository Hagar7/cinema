import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from './Details.module.scss'




export default function Details() {
    const [detailsMedia, setdetailsMedia] = useState([])
    const [proMedia, setproMedia] = useState([])
    let params = useParams()
    let myImg = "https://image.tmdb.org/t/p/w500";
    

 let detailsData =async ()=>{
    let {data} = await axios.get(`https://api.themoviedb.org/3/${params.mediatype}/${params.id}?api_key=f2afc7f6ffe3b10c3847bde15c6e4db3&language=en-US`)
    setdetailsMedia(data)

    let response = data.genres;
    setproMedia(response)
 }
 useEffect(() => {
    detailsData()
 }, [])
 
  return (
    <>
    <div className={`${style.detail}`}>
        <div className="row py-5">
            <div className="col-md-4">
                {params.mediatype === 'person'?
                 <img src={`${myImg}${detailsMedia.profile_path}`} alt="" className='w-100' />
                :<img src={`${myImg}${detailsMedia.poster_path}`} alt="" className='w-100' />}
                
            </div>
            <div className="col-md-8">
                <div>
                    <h2 className={`${style.title}`}>{detailsMedia.name}{detailsMedia.title}</h2>
                    <p className='text-muted m-3'>{detailsMedia.overview}</p>
                    <div className="info d-flex justify-content-space-between">
                       <a className='myBtn btn btn-danger' href={detailsMedia.homepage} target="_blank" rel="noreferrer">Link</a>
                    </div>
                </div>

            </div>
        </div>

    </div>
    
    </>
  )
}
