import axios from "axios"
import { createContext, useEffect, useState } from "react"



export let MediaContext = createContext(null)

export default function MediaContextProvider (props){

    const [movieData, setmovieData] = useState([])
    const [TvshowData, setTvshowData] = useState([])
    const [peopleData, setpeopleData] = useState([])
    

    let allMediaData =async (mediaType,callback)=>{
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=f2afc7f6ffe3b10c3847bde15c6e4db3`)
        callback(data.results)
         console.log(data.results);
       
        
        
    }

    useEffect(() => {
        allMediaData('movie',setmovieData)
        allMediaData('tv',setTvshowData)
        allMediaData('person',setpeopleData)

    }, [])
    return <MediaContext.Provider value={{movieData,TvshowData,peopleData}} >
       {props.children}
    </MediaContext.Provider>



}