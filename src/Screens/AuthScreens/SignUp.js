import { useEffect, useState } from "react"
import { IoEye } from "react-icons/io5"
import { Link } from "react-router-dom"
import { FaRegUser } from "react-icons/fa";
import { PiSuitcaseLight } from "react-icons/pi";
import { AiOutlineLoading } from "react-icons/ai";
import useSignup from "../../hooks/useSignup";
import mailImg from "../../images/bonbon-fast-email-sending-2.png"

export default function SignUp(){
    let {signup, signupLoading, signupStatus} = useSignup()
    let [currentStage, setCurrentStage] = useState(1)
    let [passType, setPassType] = useState('password')

    let [signupData, setSignupData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        location: "",
        confirm_password: "",
        tac: false,
        usertype: null
    })

    function togglePass(){
        setPassType(passType === 'password' ? 'text' : 'password')
    }

    function submitSignupForm(e){
        e.preventDefault()
        console.log(signupData)
        signup(signupData)
        if(signupStatus.success){
            changeStage(3)
        }
    }

    function changeStage(stage){
        setCurrentStage(stage)
    }

    function handleFormDataChange(e){
        setSignupData((prev)=>{
            return {
                ...prev,
                [e.target.name]: e.target.name === "tac" ? e.target.checked : e.target.value
            }
        })
    }

    useEffect(()=>{
        if(!signupStatus.error && signupStatus.message === "success"){
            setCurrentStage(3)
        }
    },[signupStatus.error, signupStatus.message])

    return(
        <div className="md:w-[50%]">
            <div className="absolute flex justify-between top-0 my-4">
                <StageIndicator stageTitle="Select account type" stage="1" currentStage={currentStage} />
                <StageIndicator stageTitle="Enter details" stage="2" currentStage={currentStage} />
                <StageIndicator stageTitle="Confirm Email" stage="3" currentStage={currentStage} />
            </div>
            {
                currentStage === 1 
                &&
                <div>
                    <div className="md:flex md:justify-between">
                        <RoleSelectionTab
                            title="Ticketeer"
                            description="Register as a user, to enjoy all the perks that comes with our unique services"
                            value="basic"
                            currentRole={signupData.usertype}
                            onChange={handleFormDataChange}
                        >
                            <FaRegUser size={27} className="text-primary-dark" />
                        </RoleSelectionTab>
                        <RoleSelectionTab
                            title="Organizer"
                            description="Want to host events and create tickets? this account type is for you"
                            value="organiser"
                            currentRole={signupData.usertype}
                            onChange={handleFormDataChange}
                        >
                            <PiSuitcaseLight size={27} className="text-primary-dark" />
                        </RoleSelectionTab>
                    </div>
                    <button disabled={signupData.usertype === null ? true : false} onClick={()=>{changeStage(2)}} className={`ml-auto p-2 w-[20%] rounded-md m-4 mt-12 ${signupData.usertype === null ? "bg-transparent text-primary-dark" : "bg-primary-dark text-primary-orange"} text-center`}> 
                        Continue 
                    </button>
                </div>
            }
            {
                signupData.usertype === "basic"
                &&
                currentStage === 2
                &&
                <div className="h-auto bg-white p-5 my-10 rounded-2xl">
                    <h1 className="text-2xl text-center font-bold text-primary-dark my-2">Welcome to Uniticketeer</h1>
                    <hr></hr>
                    <p className="py-3 text-center text-[#CCCCCC] ">Set up your user account</p>
                    {signupStatus.error && <div className="text-red-500 text-center font-medium">{signupStatus.message}</div>}
                    <form className="" onSubmit={submitSignupForm}>
                        <div className="font-bold text-primary-dark">First Name*</div>
                        <div className="p-2 my-2 border-2 rounded-full">
                            <input type="text" required placeholder="First Name" name="firstname" value={signupData.firstname} onChange={handleFormDataChange} className="outline-none w-full"/>
                        </div>
                        <div className="font-bold text-primary-dark">Last Name*</div>
                        <div className="p-2 my-2 border-2 rounded-full">
                            <input type="text" required placeholder="Last Name" name="lastname" value={signupData.lastname} onChange={handleFormDataChange} className="outline-none w-full"/>
                        </div>
                        <div className="font-bold text-primary-dark">Username*</div>
                        <div className="p-2 my-2 border-2 rounded-full">
                            <input type="text" required placeholder="Username" name="username" value={signupData.username} onChange={handleFormDataChange} className="outline-none w-full" />
                        </div>
                        <div className="font-bold text-primary-dark">Location*</div>
                        <div className="p-2 my-2 border-2 rounded-full">
                            <select type="text" required name="location" value={signupData.location} onChange={handleFormDataChange} className="outline-none w-full">
                                <option>Select Country</option>
                                <option value={"Nigeria"}>Nigeria</option>
                            </select>
                        </div>
                        <div className="font-bold text-primary-dark">Email*</div>
                        <div className="p-2 my-2 border-2 rounded-full">
                            <input type="email" required placeholder="Email" name="email" value={signupData.email} onChange={handleFormDataChange} className="outline-none w-full"/>
                        </div>
                        <div className="font-bold text-primary-dark">Password*</div>
                        <div className="flex p-2 my-2 border-2 rounded-full">
                            <input type={passType} required placeholder="*******" name="password" value={signupData.password} onChange={handleFormDataChange}  className="outline-none w-full" />
                            <IoEye onClick={togglePass} />
                        </div>
                        <div className="font-bold text-primary-dark">Confirm Password*</div>
                        <div className="flex p-2 my-2 border-2 rounded-full">
                            <input type={passType} required placeholder="*******" name="confirm_password" value={signupData.confirm_password} onChange={handleFormDataChange}  className="outline-none w-full" />
                            <IoEye onClick={togglePass} />
                        </div>
                        <div>
                            <input type="checkbox" required name="tac" checked={signupData.tac} onChange={handleFormDataChange} />
                            <label>I have read and understood the <a href="/" className="text-primary-orange font-medium">Terms and Conditions</a> of uniticketeer</label>
                        </div>
                        <div className="text-right p-2">
                            <Link to={"/forgot/password"}>
                                Forgot password?
                            </Link>
                        </div>
                        <button disabled={signupLoading} className={`w-full p-2 ${signupLoading ? "bg-transparent text-primary-dark" : "bg-primary-dark text-white hover:bg-primary-orange"} rounded-2xl font-bold border-xl transition-all ease-in-out duration-300 cursor-pointer `}>
                            {signupLoading
                            ?
                            <AiOutlineLoading />
                            :
                            "Sign up"
                            }
                        </button>
                        <div className="pt-2">
                            already have an account? <Link className="cursor-pointer" to={"/auth/login"}>Login</Link>
                        </div>
                    </form>

                    <div onClick={()=> {changeStage(1)}} className="cursor-pointer bg-primary-dark p-2 rounded-md text-center text-primary-orange">Go Back</div>
                </div>
            }
            {
                signupData.usertype === "organiser"
                &&
                currentStage === 2
                &&
                <div className="h-auto bg-white p-5 my-10 rounded-2xl">
                <h1 className="text-2xl text-center font-bold text-primary-dark my-2">Welcome to Uniticketeer</h1>
                <hr></hr>
                <p className="py-3 text-center text-[#CCCCCC] ">Set up your organiser account</p>
                {signupStatus.error && <div className="text-red-500 text-center font-medium">{signupStatus.message}</div>}
                <form className="" onSubmit={submitSignupForm}>
                    <div className="font-bold text-primary-dark">First Name*</div>
                    <div className="p-2 my-2 border-2 rounded-full">
                        <input type="text" required placeholder="First Name" name="firstname" value={signupData.firstname} onChange={handleFormDataChange} className="outline-none w-full"/>
                    </div>
                    <div className="font-bold text-primary-dark">Last Name*</div>
                    <div className="p-2 my-2 border-2 rounded-full">
                        <input type="text" required placeholder="Last Name" name="lastname" value={signupData.lastname} onChange={handleFormDataChange} className="outline-none w-full"/>
                    </div>
                    <div className="font-bold text-primary-dark">Brand Name*</div>
                    <div className="p-2 my-2 border-2 rounded-full">
                        <input type="text" required placeholder="Brand Name" name="username" value={signupData.username} onChange={handleFormDataChange} className="outline-none w-full" />
                    </div>
                    <div className="font-bold text-primary-dark">Location*</div>
                    <div className="p-2 my-2 border-2 rounded-full">
                        <select type="text" required placeholder="Username" name="location" value={signupData.location} onChange={handleFormDataChange} className="outline-none w-full">
                            <option value={"Nigeria"}>Nigeria</option>
                        </select>
                    </div>
                    <div className="font-bold text-primary-dark">Email*</div>
                    <div className="p-2 my-2 border-2 rounded-full">
                        <input type="email" required placeholder="Email" name="email" value={signupData.email} onChange={handleFormDataChange} className="outline-none w-full"/>
                    </div>
                    <div className="font-bold text-primary-dark">Password*</div>
                    <div className="flex p-2 my-2 border-2 rounded-full">
                        <input type={passType} required placeholder="*******" name="password" value={signupData.password} onChange={handleFormDataChange} className="outline-none w-full" />
                        <IoEye onClick={togglePass} />
                    </div>
                    <div className="font-bold text-primary-dark">Confirm Password*</div>
                    <div className="flex p-2 my-2 border-2 rounded-full">
                        <input type={passType} required placeholder="*******" name="confirm_password" value={signupData.confirm_password} onChange={handleFormDataChange}  className="outline-none w-full" />
                        <IoEye onClick={togglePass} />
                    </div>
                    <div>
                        <input type="checkbox" required name="tac" checked={signupData.tac} onChange={handleFormDataChange} />
                        <label>I have read and understood the <a href="/" className="text-primary-orange font-medium">Terms and Conditions</a> of uniticketeer</label>
                    </div>
                    <div className="text-right p-2">
                        <Link to={"/forgot/password"}>
                            Forgot password?
                        </Link>
                    </div>
                    <button disabled={signupLoading} className={`w-full p-2 ${signupLoading ? "bg-transparent text-primary-dark" : "bg-primary-dark text-white hover:bg-primary-orange"} rounded-2xl font-bold border-xl transition-all ease-in-out duration-300 cursor-pointer `}>
                        {signupLoading
                            ?
                            <AiOutlineLoading />
                            :
                            "Sign up"
                            }
                    </button>
                    <div className="pt-2">
                        already have an account? <Link className="cursor-pointer" to={"/auth/login"}>Login</Link>
                    </div>
                </form>

                <div onClick={()=> {changeStage(1)}} className="cursor-pointer bg-primary-dark p-2 rounded-md text-center text-primary-orange">Go Back</div>
            </div>
            }
            {
                currentStage === 3
                &&
                <div className="flex flex-col items-center">
                    <p className="text-xl text-primary-dark text-center">Your confirmation email is on the way, please check your mail or spam folder</p>
                    <img src={mailImg} alt="rocket flying out of a pc" />
                    <p className="text-sm text-center">Illustration by <a href="https://icons8.com/illustrations/author/RogqKjMRAQ79">xopolin</a> from <a href="https://icons8.com/illustrations">Ouch!</a></p>
                </div>
            }
        </div>
    )
}


function StageIndicator({stageTitle, stage, currentStage}){
    return(
        <div className="flex flex-col justify-center items-center mx-4">
            <p className="text-primary-dark font-medium text-sm">{stageTitle}</p>
            <div className={`w-[20px] h-[20px] text-center text-sm rounded-full border border-primary-dark ${currentStage < stage ? "bg-[#FFF]" : "bg-primary-dark text-primary-orange"}`}>
                {stage}
            </div>
        </div>
    )
}

function RoleSelectionTab({title, children, description, currentRole, value, onChange}){
    return(
        <label htmlFor={value} className="flex flex-col justify-center items-center cursor-pointer border-2 border-primary-dark rounded-md w-[200px] p-4">
            <h3 className="text-2xl font-medium text-primary-dark">{title}</h3>
            <div className="flex items-center justify-center m-2 w-[50px] h-[50px] border border-primary-dark rounded-full">
                {children}
            </div>
            <p className="text-[14px] my-2">{description} </p>
            <input type="radio" name="usertype" checked={currentRole === value ? true : false} value={value} id={value} onChange={onChange} />
        </label>
    )
}