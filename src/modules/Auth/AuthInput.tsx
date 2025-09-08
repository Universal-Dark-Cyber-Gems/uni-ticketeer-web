import { useState } from "react";
import { IoEye } from "react-icons/io5";

export function AuthInput({label, type, inputtype, required, placeholder, name, value, options, onChange}){

    let [passType, setPassType] = useState('password')

    function togglePass(){
        setPassType(passType === 'password' ? 'text' : 'password')
    }

    return(
        <div className="w-full">
            <div className="font-bold text-primary-dark">{label}</div>
            {
                type == "select"
                ?
                <div className="p-2 my-2 border-2 rounded-full">
                    <select required={required} placeholder={placeholder} name={name} value={value} onChange={onChange} className="outline-none text-primary-dark bg-inherit w-full">
                        {options?.map((option:{label: string, value: string}, i:number)=>(<option key={i} value={option.value}>{option.label}</option>))}
                    </select>
                </div>
                :
                <div className="flex p-2 my-2 border-2 rounded-full">
                    <input type={type === "password" ? passType : inputtype} required={required} placeholder={placeholder} name={name} value={value} onChange={onChange} className="outline-none text-primary-dark bg-inherit w-full"/>
                    {type === "password" && <IoEye onClick={togglePass} />}
                </div>
            }
        </div>
    )
}