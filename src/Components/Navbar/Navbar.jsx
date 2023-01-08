import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import style from './Navbar.module.scss'


export default function Navbar() {
  const {userData,logOut} = useContext(AuthContext);
  return (
    <>
 <nav className={`${style.bgNavbar} navbar navbar-expand-lg`}>
  <div className="container-fluid">
    <NavLink className={`${style.brand} navbar-brand`} href="#">Cinema</NavLink>
    <button className={`${style.toggy} navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to=""  className={({isActive })=>isActive?" nav-link yellowbg":"nav-link"} >Home</NavLink>
        </li>
      

           <li className='nav-item' >
            <NavLink  className={({isActive})=>isActive?" nav-link yellowbg":"nav-link"} to="movies">
              Movies
            </NavLink>
           </li>
          
      
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?" nav-link yellowbg":"nav-link"} to="tvshows">TvShows</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?" nav-link yellowbg":"nav-link"} to="people">People</NavLink>
        </li>
     
      </ul>:""}
   
      <div className={`${style.imp} d-flex ms-auto `}>
      <form className={`${style.navbarForm} d-flex`} role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      </form>
      <ul className={`${style.socialLeft} navbar-nav  mb-2 mb-lg-0`}>
        <div className={`${style.socialMedia} d-flex align-items-center`}>
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-spotify mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
        </div>
        {userData?
        <>
          <li className="nav-item">
      <NavLink className={({isActive})=>isActive?" nav-link ":"nav-link"} onClick={logOut} >LogOut</NavLink>
       </li>
        </>:
        <>
           <li className="nav-item">
          <NavLink className={({isActive})=>isActive?" nav-link yellowbg":"nav-link"} to="login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?" nav-link yellowbg":"nav-link"} to="register">Register</NavLink>
        </li>
        </>}
      </ul>
      </div>
    </div>
  </div>
</nav>

    
    </>
  )
}
