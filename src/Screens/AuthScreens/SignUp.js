import { useState } from "react"
import { IoEye } from "react-icons/io5"
import { Link } from "react-router-dom"

export default function SignUp(){

    let [passType, setPassType] = useState('password')

    function togglePass(){
        setPassType(passType === 'password' ? 'text' : 'password')
    }

    return(
        <div className="md:w-[50%] h-auto bg-white p-5 my-10 rounded-2xl">
            <h1 className="text-2xl text-center font-bold text-primary-dark my-2">Welcome to Uniticketeer</h1>
            <hr></hr>
            <p className="py-3 text-center text-[#CCCCCC] ">Set up an account to enjoy all the benefits</p>
            <form className="">
                <div className="font-bold text-primary-dark">First Name*</div>
                <div className="p-2 my-2 border-2 rounded-full">
                    <input type="text" placeholder="First Name" className="outline-none w-full"/>
                </div>
                <div className="font-bold text-primary-dark">Last Name*</div>
                <div className="p-2 my-2 border-2 rounded-full">
                    <input type="text" placeholder="Last Name" className="outline-none w-full"/>
                </div>
                <div className="font-bold text-primary-dark">Username*</div>
                <div className="p-2 my-2 border-2 rounded-full">
                    <input type="text" placeholder="Username" className="outline-none w-full"/>
                </div>
                <div className="font-bold text-primary-dark">Location*</div>
                <div className="p-2 my-2 border-2 rounded-full">
                    <select type="text" placeholder="Username" className="outline-none w-full">
                        <option value={"Abia"}>Abia</option>
                    </select>
                </div>
                <div className="font-bold text-primary-dark">Email*</div>
                <div className="p-2 my-2 border-2 rounded-full">
                    <input type="email" placeholder="Email" className="outline-none w-full"/>
                </div>
                <div className="font-bold text-primary-dark">Password*</div>
                <div className="flex p-2 my-2 border-2 rounded-full">
                    <input type={passType} placeholder="*******"  className="outline-none w-full" />
                    <IoEye onClick={togglePass} />
                </div>
                <div className="font-bold text-primary-dark">Confirm Password*</div>
                <div className="flex p-2 my-2 border-2 rounded-full">
                    <input type={passType} placeholder="*******"  className="outline-none w-full" />
                    <IoEye onClick={togglePass} />
                </div>
                <div className="text-right p-2">
                    <Link to={"/forgot/password"}>
                        Forgot password?
                    </Link>
                </div>
                <button className="w-full p-2 bg-primary-dark rounded-2xl text-white font-bold border-xl">Sign up</button>
                <div className="pt-2">
                    already have an account? <Link to={"/auth/login"}>Login</Link>
                </div>
            </form>
        </div>
    )
}