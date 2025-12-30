import { useEffect, useRef, useState } from "react"
import Error from "../../error/Error"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { IoEye,IoEyeOff } from "react-icons/io5";


export default function Register(){
    const [showNewPass,setShowNewPass] = useState(false)
    const [showConfPass,setShowConfPass] = useState(false)
    const [isSubmit,setIsSubmit] = useState(false)
    const [fieldErrors,setFieldErrors] = useState(null)
    const inpRef = useRef([])    
    const navigate = useNavigate()
    const [disabledConPass,setDisabledConPass] = useState(true)
    const [formValues,setFormValues] = useState({
        name: {firstname: "", lastname: ""},
        userName : '',
        email : '',
        password : '',
        configPassword : ''        
    })
    const [err,setErr] = useState([])

    useEffect(()=>{
        localStorage.getItem("user") && navigate('/dashbord')       
    },[])

    // چشم پسورد
    const showPassHandler = (target)=>{
        if (target === 'newPass') showNewPass ? setShowNewPass(false) : setShowNewPass(true)
        else showConfPass ? setShowConfPass(false) : setShowConfPass(true)
    }

    // وارد کردن مقدار در هر اینپوت
    const changeHandler = (e)=>{

        if(e.target.name === "firstname" || e.target.name === "lastname"){
            setFormValues({...formValues, name : {...formValues.name , [e.target.name] : e.target.value.trim()}})            
        }else{
            setFormValues({...formValues,[e.target.name] : e.target.value.trim()})
        }
        
        if(e.target.name === 'password'){
            e.target.value.length >= 6 ? setDisabledConPass(false) : setDisabledConPass(true) 
        }
    }

    // اعتبار سنجی فرم ها
    const validate = ()=>{
       const errorinp = {}
       const errorMessage = [];
       setErr([])      
       if(formValues.name.firstname.length  === 0 ||
          formValues.name.lastname.length  === 0 ||
          formValues.userName.length  === 0 ||
          formValues.email.length  === 0 ||
          formValues.password.length  === 0 ||
          formValues.configPassword.length === 0){
            errorMessage.push('لطفا فیلد ها را خالی نگذارید.') 
            formValues.name.firstname.length  === 0 && (errorinp.firstName = 'error')
            formValues.name.lastname.length  === 0 && (errorinp.lastName = 'error')
            formValues.userName.length  === 0 && (errorinp.userName = 'error')
            formValues.email.length  === 0 && (errorinp.email = 'error')
            formValues.password.length  === 0 && (errorinp.password = 'error')
            formValues.configPassword.length === 0 && (errorinp.configPassword = 'error')

          } 
        
        if(formValues.userName.length < 4){
            errorMessage.push('نام کاربری نباید کمتر از 4 کاراکتر باشد.')
            errorinp.userName =  'error'          
        }  
        if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(formValues.email)){
            errorMessage.push('ایمیل نامعتبر است.') 
            errorinp.email = 'error'
        }  

        if(formValues.password.length < 6){
            errorMessage.push('رمز عبور نباید کمتر از 6 کاراکتر داشته باشد.')
            errorinp.password = 'error'
        }
        else{
         if(formValues.configPassword !== formValues.password){
            errorMessage.push('تکرار رمز عبور صحیح نمیباشد.') 
            errorinp.configPassword = 'error'
         }   
        }          
        
        return [errorinp,errorMessage]
        
        
    }

    // عملیات ثبت نام
    const registerHandler = ()=>{    
        setIsSubmit(true)     
        const [errorinp,errorMessage] = validate()
        setErr(errorMessage) 
        setFieldErrors(errorinp)
        
        if(errorMessage.length === 0){            
            localStorage.setItem("user" , JSON.stringify(formValues))  
            navigate('/dashbord')
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
            registerHandler()
        }
    }

    // استایل اینپوت صحیح و غلط
    const inpStyleHandler = (inpName)=>{
        if(isSubmit){           
           return fieldErrors[inpName] ?
                  'border-2 border-[red]' :
                  'border-2 border-[green]'  
        }
    }

    return (
        <>
        <div className="form-container w-100 md:w-125">
         <div>
            <div>
                <label htmlFor="firstName">نام</label>
                <input type="text" ref={(el)=>inpRef.current[0]= el} onKeyDown={(e)=>enterHandler(e,0)} name="firstname" onChange={changeHandler} id="firstName" className={`${inpStyleHandler('firstName')}`}  />
            </div>
            <div>
                <label htmlFor="lastName">نام خانوادگی</label>
                <input type="text" ref={(el)=>inpRef.current[1]= el} onKeyDown={(e)=>enterHandler(e,1)}  name="lastname" onChange={changeHandler} id="lastName" className={`${inpStyleHandler('lastName')}`}  />
            </div>
            <div>
                <label htmlFor="userName">نام کاربری</label>
                <input type="text" ref={(el)=>inpRef.current[2]= el} onKeyDown={(e)=>enterHandler(e,2)} name="userName" onChange={changeHandler} id="userName" placeholder="شامل حداقل 4 کاراکتر" className={`${inpStyleHandler('userName')}`}  />
            </div>
            <div>
                <label htmlFor="email">ایمیل</label>
                <input type="text" ref={(el)=>inpRef.current[3]= el} onKeyDown={(e)=>enterHandler(e,3)} name="email" onChange={changeHandler} id="email" className={`${inpStyleHandler('email')}`}  />
            </div>
            <div>
                <label htmlFor="password">رمز عبور</label>
                <div className={`inpGroupPass ${inpStyleHandler('password')}`}>
                 <input type={showNewPass ? "text" : "password"} ref={(el)=>inpRef.current[4]= el} onKeyDown={(e)=>enterHandler(e,4)} name="password" onChange={changeHandler} id="password" placeholder="شامل حداقل 6 کاراکتر"/>
                 <IoEye className={`${showNewPass ? "hidden" : ''} text-2xl cursor-pointer me-1`} onClick={()=>showPassHandler('newPass')}/>
                 <IoEyeOff className={`${showNewPass ? '' : 'hidden'} text-2xl cursor-pointer me-1`} onClick={()=>showPassHandler('newPass')}/>
                </div>
            </div>
            <div className={`${disabledConPass && 'opacity-60'}`}>
                <label htmlFor="configPassword">تکرار رمز عبور</label>
                <div className={`inpGroupPass ${inpStyleHandler('configPassword')}`}>
                 <input type={showConfPass ? "text" : "password"} disabled={disabledConPass} ref={(el)=>inpRef.current[5]= el} onKeyDown={lastInpHandler} name="configPassword" onChange={changeHandler} id="configPassword"/>
                 <IoEye className={`${showConfPass ? "hidden" : ''} text-2xl cursor-pointer me-1`} onClick={()=>showPassHandler('confPass')}/>
                 <IoEyeOff className={`${showConfPass ? '' : 'hidden'} text-2xl cursor-pointer me-1`} onClick={()=>showPassHandler('confPass')}/>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Link to={'/'} className="form-button  bg-red-600">بازگشت</Link>
                <button type="button" className="bg-[#3488dc] form-button" onClick={registerHandler}> ثبت نام </button>
            </div>
        </div> 
        {err.length != 0 && <Error err={err}/>}   
        </div> 
        </>     
    )
}