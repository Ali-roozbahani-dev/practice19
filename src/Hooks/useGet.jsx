import { useEffect, useState } from "react";
import axios from "axios";

export default function useGet({url}){
    const[data,setData] = useState([])
    const[error,setError] = useState('')

    useEffect(()=>{
        const getData = async () => {
            try{
               const res = await axios.get('https://fakestoreapi.com/users')
               setData(res.data)
               
            }catch(e){
                console.log(e)
            }            
        }
        getData()
    },[])

    return [data,error]
}