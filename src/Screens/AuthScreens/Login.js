import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate} from "react-router-dom";
import { loginUser } from "../../api/login";

export default function Login(){
    const navigate = useNavigate()
    let [passType, setPassType] = useState('password')

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    function togglePass(){
        setPassType(passType === 'password' ? 'text' : 'password')
    }

    async function submitLogin(e){
        e.preventDefault()

        let res = await loginUser({email: email, password: password})
        console.log(res)
        navigate('/dashboard')
    }
    return(
     
        <div className="md:w-[50%] h-auto bg-white p-5 rounded-2xl">
            <h1 className="text-2xl text-center font-bold text-primary-dark my-2">Welcome Back</h1>
            <hr></hr>
            <p className="py-3 text-center text-[#CCCCCC] ">Enter your details to sign in</p>
            <form className="" onSubmit={submitLogin}>
                <div className="font-bold">Email*</div>
                <div className="p-2 my-2 border-2 rounded-full">
                    <input type="email" value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} className="outline-none w-full"/>
                </div>
                <div className="font-bold">Password*</div>
                <div className="flex p-2 my-2 border-2 rounded-full">
                    <input type={passType} value={password} placeholder="*******" onChange={(e)=>{setPassword(e.target.value)}}  className="outline-none w-full" />
                    <IoEye onClick={togglePass} />
                </div>
                <div className="text-right p-2 cursor-pointer">
                    <Link>
                        Forgot password?
                    </Link>
                </div>
                <button className="w-full p-2 bg-primary-dark rounded-2xl text-white font-bold border-xl">Login</button>
                <div className="pt-2">
                    don't have an account? <Link className="cursor-pointer hover:underline" to={"/auth/signup"}>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}