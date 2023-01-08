import  { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function ProtectedRoute({children}) {
    const {userData} = useContext(AuthContext);
    if(userData == null & localStorage.getItem('token') == null){
     return <Navigate to="/login"/>
    }
    else{
        return children;
    }

}
