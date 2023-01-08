import axios from 'axios'
import Joi from 'joi';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import style from './Login.module.scss'

export default function Login() {
  const {saveUserData} = useContext(AuthContext);

  let [errormsg,seterrormsg] = useState('');
  const [userValidation, SetUserValidation] = useState({
    email: {
      error: false,
      errorMessage: "must provide valid mail",
    },
    password: {
      error: false,
      errorMessage: "password must contain symbols, letters & numbers ",
    },
  })
  const [user,setuser] = useState({
    email:"",
    password:""
  })
  //navigation
   let navigate = useNavigate()

   let goToHome = ()=>{
    navigate('/')
   }
  //on change

  let inputData = (e)=>{
   let myUser = {...user}
    myUser[e.target.name] = e.target.value;
    setuser(myUser)
  }

  //validation joi
  let validationForm = ()=>{

    let schema = Joi.object({
      email:Joi.string().required().email({tlds:{allow:['com','net']}}),
      password:Joi.string().required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    })
    return schema.validate(user,{abortEarly:false})
  }


 

  //on submit
  let sendData = async(e)=>{
    e.preventDefault()
    SetUserValidation({
      email: {
        error: false,
        errorMessage: "must provide valid mail",
      },
      password: {
        error: false,
        errorMessage: "password must contain symbols, letters & numbers ",
      },
    })
    let validateFormDate = validationForm()
    if(validateFormDate.error){
      validateFormDate.error.details.forEach((error)=>{
        SetUserValidation((userValidation) => {
          return {
            ...userValidation,
            [error.path[0]]: { ...userValidation[error.path[0]], error: true },
          };
        });
      });
    }
    else{

      let {data} = await axios.post('https://sticky-note-fe.vercel.app/signin',user)
     if(data.message ==="success") {
      localStorage.setItem('token',data.token)
      saveUserData()
      goToHome()
     } else {
      seterrormsg(data.message);
     }
    }
  }

  return (
   <>
   <div className={`${style.login} py-5 m-auto w-75`}>
    <h3>Login Form</h3>
    <form onClick={sendData}>
    {errormsg?<div className='alert alert-danger p-2'>{errormsg}</div>:""}
    <div className="inputData} my-2">
          <label htmlFor="email">Email</label>
          <input onChange={inputData} type="email" name='email' className='form-control my-3' />
          {userValidation.email.error ? <div className={`${style.errorMsg} alert p-1 text-start`}>
          {userValidation.email.errorMessage}</div> : ""}
        </div>
        <div className="inputData} my-2">
          <label htmlFor="password">Password</label>
          <input onChange={inputData} type="password" name='password' className='form-control my-3' />
          {userValidation.password.error ? <div className={`${style.errorMsg} alert p-1 text-start`}>
          {userValidation.password.errorMessage}</div> : ""}
        </div>
        <button className="myBtn btn btn-danger my-3 float-end">Register</button>
       <div className="clear-fix"></div>
    </form>
   </div>
   
   </>
  )
}
