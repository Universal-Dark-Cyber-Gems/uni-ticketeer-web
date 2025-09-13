import { useEffect, useState } from "react"
import { IoArrowBack, IoEye } from "react-icons/io5"
import { Link } from "react-router-dom"
import { FaRegUser } from "react-icons/fa";
import { PiSuitcaseLight } from "react-icons/pi";
import { AiOutlineLoading } from "react-icons/ai";
import useSignup from "../../hooks/useSignup";
import mailImg from "../../images/bonbon-fast-email-sending-2.png"
import { toast } from "react-toastify";
import { AuthInput } from "../../modules/Auth/AuthInput";
import { useUserProvider } from "../../contexts/UserContext";
import CustomLoader from "../../components/CustomLoader";
import useLogin from "../../hooks/useLogin";

export default function SignUp(){
    let {signup, signupLoading, signupStatus} = useSignup()
    let {resendVerifMail} = useLogin()
    let [currentStage, setCurrentStage] = useState(1)
    let [passType, setPassType] = useState('password')

    let [signupData, setSignupData] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
        location: "Nigeria",
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
        let namesArr = signupData.fullname.split(" ")
        if(namesArr.length < 2){
            toast.error("Enter Full Name Seperated by Space")
            return
        }
        let formatedData = {
            ...signupData,
            fullname: undefined,
            firstname: namesArr[0],
            lastname: namesArr[1],
        }
        signup(formatedData)
        if(signupStatus.success){
            changeStage(3)
        }
    }

    function resendVerificationMail(){
        resendVerifMail(signupData.email)
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
        <div className="md:w-[60%]">
            {
                currentStage == 2
                &&
                <div 
                    onClick={()=> {changeStage(1)}} 
                    className="w-[50px] h-[50px] flex items-center justify-center rounded-full cursor-pointer bg-primary-dark text-center text-primary-orange my-4"
                >
                    <IoArrowBack />
                </div>
            }
            <div className="flex justify-between">
                <StageIndicator stageTitle="Select account type" stage="1" currentStage={currentStage} />
                <StageIndicator stageTitle="Enter details" stage="2" currentStage={currentStage} />
                <StageIndicator stageTitle="Confirm Email" stage="3" currentStage={currentStage} />
            </div>
            {
                currentStage === 1 
                &&
                <div className="w-full p-2">
                    <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:justify-between pt-12">
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
                    <button 
                        disabled={signupData.usertype === null ? true : false} 
                        onClick={()=>{changeStage(2)}} 
                        className={`ml-auto p-2 w-full md:w-[25%] rounded-md my-4 mt-12 ${signupData.usertype === null ? "bg-transparent text-primary-dark" : "bg-primary-dark text-primary-orange"} text-center`}
                    > 
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
                    <h1 className="text-2xl text-center font-bold text-primary-dark my-2">Welcome to Emume</h1>
                    <hr></hr>
                    <p className="py-3 text-center text-[#CCCCCC] ">Set up your user account</p>
                    {signupStatus.error && <div className="text-red-500 text-center font-medium">{signupStatus.message}</div>}
                    <form className="" onSubmit={submitSignupForm}>
                        <div className="md:flex gap-4 justify-between">
                            <AuthInput 
                                label={"Full Name*"}
                                type={"text"}
                                required={true}
                                placeholder={"Full Name"}
                                name={"fullname"}
                                value={signupData.fullname}
                                onChange={handleFormDataChange}
                            />
                            <AuthInput 
                                label={"Username*"}
                                type={"text"}
                                required={true}
                                placeholder={"Username"}
                                name={"username"}
                                value={signupData.username}
                                onChange={handleFormDataChange}
                            />
                        </div>
                        <div className="md:flex gap-4 justify-between">
                            <AuthInput 
                                label={"Location*"}
                                type={"select"}
                                name={"location"}
                                required={true}
                                options={[{label: "Nigeria", value: "Nigeria"}]}
                                value={signupData.location}
                                onChange={handleFormDataChange}
                            />
                            <AuthInput 
                                label={"Email*"}
                                inputtype={"email"}
                                required={true}
                                placeholder={"Email"}
                                name={"email"}
                                value={signupData.email}
                                onChange={handleFormDataChange}
                            />
                        </div>
                        <div className="md:flex gap-4 justify-between">
                            <AuthInput 
                                label={"Password*"}
                                inputtype={passType}
                                type={"password"}
                                required={true}
                                placeholder={"*******"}
                                name={"password"}
                                value={signupData.password}
                                togglePass={togglePass}
                                onChange={handleFormDataChange}
                            />
                            <AuthInput 
                                label={"Confirm Password*"}
                                inputtype={passType}
                                type={"password"}
                                required={true}
                                placeholder={"*******"}
                                name={"confirm_password"}
                                value={signupData.confirm_password}
                                onChange={handleFormDataChange}
                                togglePass={togglePass}
                            />
                        </div>
                        <div className="flex gap-4 text-[12px] my-4 text-primary-dark">
                            <input type="checkbox" required name="tac" checked={signupData.tac} onChange={handleFormDataChange} />
                            <label>I have read and understood the <a href="/" className="text-primary-orange font-medium">Terms and Conditions</a> of emume</label>
                        </div>
                        <button 
                            disabled={signupLoading} 
                            className={`w-full p-2 ${signupLoading ? "bg-transparent text-primary-dark" : "bg-primary-dark text-white hover:bg-primary-orange"} rounded-2xl font-bold border-xl transition-all ease-in-out duration-300 cursor-pointer `}
                        >
                            {signupLoading
                            ?
                            <CustomLoader size={20} />
                            :
                            "Sign up"
                            }
                        </button>
                        <div className="pt-2 text-primary-dark">
                            already have an account? <Link className="text-primary-orange underline" to={"/auth/login"}>Login</Link>
                        </div>
                    </form>
                </div>
            }
            {
                signupData.usertype === "organiser"
                &&
                currentStage === 2
                &&
                <div className="h-auto bg-white p-5 my-10 rounded-2xl">
                <h1 className="text-2xl text-center font-bold text-primary-dark my-2">Welcome to Emume</h1>
                <hr></hr>
                <p className="py-3 text-center text-[#CCCCCC] ">Set up your organiser account</p>
                {signupStatus.error && <div className="text-red-500 text-center font-medium">{signupStatus.message}</div>}
                <form className="" onSubmit={submitSignupForm}>
                    <div className="md:flex gap-4 justify-between">
                        <AuthInput 
                            label={"Full Name*"}
                            placeholder={"FirstName LastName"}
                            required
                            type={"text"}
                            name={"fullname"}
                            value={signupData.fullname}
                            onChange={handleFormDataChange}
                        />
                        <AuthInput 
                            label={"Brand Name*"}
                            type={"text"}
                            required
                            placeholder={"Brand Name"}
                            name={"username"}
                            value={signupData.username}
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className="md:flex gap-4 justify-between">
                        <AuthInput 
                            label={"Location*"}
                            type={"select"}
                            options={[{label: "Nigeria", value: "Nigeria"}]}
                            required
                            name={"location"}
                            value={signupData.location}
                            onChange={handleFormDataChange}
                        />
                        <AuthInput 
                            label={"Email*"}
                            type={"email"}
                            required
                            placeholder={"Email"}
                            name={"email"}
                            value={signupData.email}
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className="md:flex gap-4 justify-between">
                        <AuthInput 
                            label={"Password*"}
                            type={passType}
                            inputtype={"password"}
                            required
                            placeholder={"*******"}
                            name={"password"}
                            togglePass={togglePass}
                            value={signupData.password}
                            onChange={handleFormDataChange}
                        />
                        <AuthInput 
                            label={"Confirm Password*"}
                            type={passType}
                            inputtype={"password"}
                            placeholder={"*******"}
                            required
                            name={"confirm_password"}
                            value={signupData.confirm_password}
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className="flex gap-4 text-[12px] my-4 text-primary-dark">
                        <input type="checkbox" required name="tac" checked={signupData.tac} onChange={handleFormDataChange} />
                        <label>I have read and understood the <a href="/" className="text-primary-orange font-medium">Terms and Conditions</a> of emume</label>
                    </div>
                    <button disabled={signupLoading} className={`w-full p-2 ${signupLoading ? "bg-transparent text-primary-dark" : "bg-primary-dark text-white hover:bg-primary-orange"} rounded-2xl font-bold border-xl transition-all ease-in-out duration-300 cursor-pointer `}>
                        {signupLoading
                            ?
                            <CustomLoader size={20} />
                            :
                            "Sign up"
                            }
                    </button>
                    <div className="pt-2 text-primary-dark">
                        already have an account? <Link className="text-primary-orange underline" to={"/auth/login"}>Login</Link>
                    </div>
                </form>
            </div>
            }
            {
                currentStage === 3
                &&
                <div className="flex flex-col items-center pt-[50px]">
                    <p className="text-xl text-primary-dark text-center">Your confirmation email is on the way, please check your mail or spam folder</p>
                    <img src={mailImg} alt="rocket flying out of a pc" />
                    <div className="border-[1px] border-primary-dark mb-2 p-2 rounded-xl cursor-pointer text-primary-dark hover:bg-primary-dark hover:text-primary-orange">
                        Resend mail
                    </div>
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
            <p className="text-[14px] my-2 text-primary-dark">{description} </p>
            <input type="radio" name="usertype" checked={currentRole === value ? true : false} value={value} id={value} onChange={onChange} />
        </label>
    )
}