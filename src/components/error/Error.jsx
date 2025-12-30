import { useEffect } from "react"
import { BiMessageError } from "react-icons/bi";


export default function Error({err}){
   

    return (
        <div className="xl:absolute left-4 top-1/4 mr-auto w-full xl:w-auto mt-5 py-4">
            {err.map((text,index)=>(
                <p key={index} className="text-right mb-4 px-2 py-1  bg-[#ffcfcf] rounded-sm"><BiMessageError size={'25px'} className="inline-block text-red-800"/> {text}</p>
            ))}
        </div>
    )
}