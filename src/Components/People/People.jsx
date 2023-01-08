import React, { useContext } from 'react'
import { MediaContext } from '../Context/MediaContext'
import style from './People.module.scss'
import { Link } from 'react-router-dom'

export default function People() {
  const {peopleData} = useContext(MediaContext)
  let myImg = "https://image.tmdb.org/t/p/w500";
  return (
    <div className={`${style.people} py-5`}>
    <div className="row">
      <div className="col-4 py-5">
      <div>
      <div className={`${style.brdr} w-25 mb-4`}></div>
       <h3>Trending</h3>
       <h3>Person</h3>
       <h3>To watch now</h3>
       <span className='text-muted'>most watched movies by day</span>
      <div className={`${style.brdr} w-75 mt-4 `}></div>
    </div>
      </div>
      
     
      {peopleData.map((item,index)=>
      <div className="col-md-2 my-3" key={index}>
      <Link className="nav-link" to={`/details/${item.media_type}/${item.id}`}>
        <div>
         {item.profile_path?<img src={`${myImg}${item.profile_path}`} alt="" className='w-100' /> 
       :<img src="/images/Karen-Hu.jpg" alt="" className='w-100' /> 
      } 
       <h6 className={`${style.title} my-2`}>
        {item.name.split(" ").slice(0,3).join(" ") + "..."}</h6>
        </div>
        </Link>
      </div>
      )}
      
    </div>
  </div>
  )
}
