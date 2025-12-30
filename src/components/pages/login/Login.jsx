import { Link } from 'react-router-dom'
import { IoEye,IoEyeOff } from "react-icons/io5";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGet from '../../../Hooks/useGet';
import { BeatLoader } from 'react-spinners';
import Swal from "sweetalert2";

export default function Login(){
    const [showPass,setShowPass] = useState(false)
    const [users] = useGet('https://fakestoreapi.com/users')
    const inpRef = useRef([]) 
    const navigate = useNavigate()
    const [userInput,setUserInput] = useState({
        userName : "",
        password : ""
    })    

    useEffect(()=>{
        localStorage.getItem("user") && navigate('/dashbord')       
    },[])

    const changeInpHandler = (e)=>{
        setUserInput((prev)=>({...prev , [e.target.name] : e.target.value}))
    }

    const loginHandler = ()=>{    
    const searchingUser =  users.find((user)=> (
            user.username === userInput.userName && user.password === userInput.password
        ))         

    if(searchingUser){
        localStorage.setItem("user" , JSON.stringify(searchingUser))
        navigate('/dashbord')
    }else{
        Swal.fire({
        title: "اطلاعات وارد شده صحیح نمیباشد.",
        text: "آیا مایل به ثبت نام هستید؟",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله, ثبت نام میکنم",
        cancelButtonText: "خیر",
        customClass: {
        popup: "swal-rtl",
      },
        }).then((result) => {
        if (result.isConfirmed) {
            searchingUser ? navigate('/dashbord') : navigate('/register')
        }
        });
    }               
    }

// اینتر روی اینپوت ها
    const enterHandler = (e,index)=>{
        if(e.key === "Enter"){
            e.preventDefault()
           inpRef.current[index + 1] && inpRef.current[index + 1].focus()
        }
    }
// اینتر روی اخرین اینپوت
    const lastInpHandler = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault()
            loginHandler()
        }
    }

    const showPassHandler = ()=>{
        showPass ? setShowPass(false) : setShowPass(true)
    }

    return (
       users.length === 0 ?

        <><BeatLoader  className='mt-60 mb-2'/> <span>درحال دریافت اطلاعات</span></> :

        <>
        <div className="panelContainer form-container">      
            <div>
                <label htmlFor="userName">نام کاربری</label>
                <input type="text" ref={(el)=>inpRef.current[0] = el} onKeyDown={(e)=>enterHandler(e,0)} name="userName" id="userName" onChange={changeInpHandler}></input>
                <label htmlFor="password">رمز عبور</label>
                <div className="inpGroupPass">
                <input type={showPass ? "text" : "password"} name="password" ref={(el)=>inpRef.current[1] = el} id="password" onKeyDown={lastInpHandler} onChange={changeInpHandler}></input>
                <IoEye className={`${showPass ? "hidden" : ''} text-2xl cursor-pointer me-1`} onClick={showPassHandler}/>
                <IoEyeOff className={`${showPass ? '' : 'hidden'} text-2xl cursor-pointer me-1`} onClick={showPassHandler}/>
                </div>
                <div className='flex justify-between items-center'>
                    <button className="bg-emerald-700 form-button" onClick={loginHandler}>ورود</button>
                    <p>حساب کاربری ندارید؟  <Link to={'/register'} className='text-indigo-600 font-bold'>ثبت نام</Link>  کنید.</p>
                </div>
            </div>
        </div>            
        </>
    )
}