import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Dashbord(){
    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()
    useEffect(()=>{        
        !user && navigate('/')
    },[])
    

    const logOutHandler = ()=>{
        localStorage.removeItem("user")
        navigate('/')
    }

    return (
        <div className="form-container mt-50 rounded-md px-5 py-3">
            <h1 className="text-2xl">{user?.name.firstname} عزیز خوش آمدید.</h1>
            <button className="form-button bg-neutral-700 mx-auto mt-6" onClick={logOutHandler}>خروج از اکانت</button>
        </div>
        
    )
}