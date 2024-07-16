import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

export default function Login(){
    const {login, loginLoading, status} = useLogin()

    let [passType, setPassType] = useState('password')

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    function togglePass(){
        setPassType(passType === 'password' ? 'text' : 'password')
    }

    async function submitLogin(e){
        e.preventDefault()
        login({email: email, password: password})
    }

    return(   
        <div className="md:w-[50%] h-auto bg-white p-5 rounded-2xl">
            <h1 className="text-2xl text-center font-bold text-primary-dark my-2">Welcome Back</h1>
            <hr></hr>
            <p className="py-3 text-center text-[#CCCCCC] ">Enter your details to sign in</p>
            {status.error && <div className="text-red-500 text-sm text-center font-medium">{status.message}</div>}
            <form className="" onSubmit={submitLogin}>
                <div className="font-bold">Email*</div>
                <div className="p-2 my-2 border-2 rounded-full">
                    <input type="email" required value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} className="outline-none w-full"/>
                </div>
                <div className="font-bold">Password*</div>
                <div className="flex p-2 my-2 border-2 rounded-full">
                    <input type={passType} required value={password} placeholder="*******" onChange={(e)=>{setPassword(e.target.value)}}  className="outline-none w-full" />
                    <IoEye onClick={togglePass} />
                </div>
                <div className="text-right p-2 cursor-pointer">
                    <Link>
                        Forgot password?
                    </Link>
                </div>
                <button disabled={loginLoading} className={`w-full p-2 ${loginLoading ? "bg-[#EEE] text-[#555]" : "bg-primary-dark text-white"} rounded-2xl  font-bold border-xl`}>Login</button>
                <div className="pt-2">
                    don't have an account? <Link className="cursor-pointer hover:underline" to={"/auth/signup"}>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}