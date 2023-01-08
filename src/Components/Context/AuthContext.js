import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export let AuthContext = createContext(null)

export default function AuthContextProvider (props){
     const [userData, setuserData] = useState(null)
    let saveUserData = ()=>{
        let encodedData = localStorage.getItem('token')
        let decodedData = jwtDecode(encodedData)
        setuserData(decodedData);
    }

    useEffect(() => {
    if(localStorage.getItem('token')){
        saveUserData()
    }
    }, [])
    

    let logOut = ()=>{
        localStorage.removeItem('token');
        setuserData(null);
        return <Navigate to="/login"/>
    }





    return <AuthContext.Provider value={{saveUserData,userData,logOut}}>
        {props.children}
    </AuthContext.Provider>
}