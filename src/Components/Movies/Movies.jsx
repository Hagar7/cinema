import React, { useContext } from 'react'
import { MediaContext } from '../Context/MediaContext'
import style from './Movies.module.scss'
import { Link } from 'react-router-dom'

export default function Movies() {
    const {movieData} = useContext(MediaContext)
    let myImg = "https://image.tmdb.org/t/p/w500";
  return (
    <>
    <div className={`${style.movie} py-5`}>
      <div className="row">
        <div className="col-4 py-5">
        <div>
        <div className={`${style.brdr} w-25 mb-4`}></div>
         <h3>Trending</h3>
         <h3>Movies</h3>
         <h3>To watch now</h3>
         <span className='text-muted'>most watched movies by day</span>
        <div className={`${style.brdr} w-75 mt-4 `}></div>
      </div>
        </div>
        {movieData.map((item,index)=>
        <div className="col-md-2 my-3" key={index}>
         <Link className="nav-link" to={`/details/${item.media_type}/${item.id}`}>
          <div>
          <img src={`${myImg}${item.poster_path}`} alt="" className='w-100' />
          <h6 className={`${style.title} my-2`}>
          {item.title.split(" ").slice(0,3).join(" ") + "..."}</h6>
          </div>
          </Link>
        </div>
        )}
        
      </div>

    </div>
    
    </>
  )
}
