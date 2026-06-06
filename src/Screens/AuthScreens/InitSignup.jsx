
import { IoClose } from "react-icons/io5";
import Section from "../../components/Section";
import { Images } from "../../images";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";

let signupDetails = [
    {
        title: "I'm a Buyer",
        description: "Discover events, buy tickets instantly, and manage your entry with ease",
        role: "basic",
        points: [
            "Browse verified events near you", 
            "Instant tickets delivery to email & dashboard",
            "Secure QR code entry at events",
            "Save events and get reminders",
            "Easy refunds (if events allow it)"
        ]
    },
    {
        title: "I'm an Organizer",
        description: "Create events, sell tickets, track sales and manage attendees from one dashboard",
        role: "organiser",
        points: [
            "Create unlimited events and ticket type",
            "Real-time sales analytics and reports",
            "QR code check-in system for attendees",
            "Payout tracking and revenue management",
            "Dedicated organizer support tools"
        ]
    }
]
export default function InitSignup(){
    let [userRole, setUserRole] = useState("")
    
    return(
        <div 
            className="w-[100vw] h-[100vh]"
            style={{
                backgroundImage: `url(${Images.signupBg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <Section>
                <div className="flex justify-between">
                    <img src={"/new-logo.png"} />
                    <div className="flex justify-center text-[32px] items-center w-[32px] md:w-[68px] h-[32px] md:h-[68px] bg-white rounded-full cursor-pointer">
                        <IoClose color="black" />
                    </div>
                </div>
                <div className="min-h-[80vh] md:flex items-center justify-center gap-5">
                    {
                        signupDetails.map((det, i)=>(
                            <SelectRoleCard
                                details={det}
                                currentRole={userRole}
                                onChangeRole={(role)=>setUserRole(role)}
                            />
                        ))
                    }
                </div>
            </Section>
        </div>
    )
}

function SelectRoleCard({details, currentRole, onChangeRole}){
    let isActive = currentRole == details.role
    return(
        <div 
            className={`relative flex flex-col items-center justify-center gap-5 w-full 
                md:w-1/2 lg:w-1/4 h-[450px] ${isActive ? "border-2 border-primary-orange" : "border-white/50 border-t border-b"} 
                p-8 text-white transition duration-300
                rounded-[30px] backdrop-blur-sm bg-white/10 cursor-pointer`}
            onClick={()=>{
                onChangeRole(details.role)
            }}
        >
            {
                isActive
                &&
                <div className="absolute top-5 left-5 flex justify-center items-center w-[20px] md:w-[24px] h-[20px] md:h-[24px] bg-primary-orange rounded-full">
                    <GiCheckMark className="text-primary-dark" />
                </div>
            }
            <p>{details.title}</p>
            <div className={`flex border items-center justify-center ${isActive ? "w-[80px] h-[80px] md:w-[100px] md:h-[100px]" : "w-[140px] h-[140px] md:w-[200px] md:h-[200px]"}  rounded-full`}>
                <FaRegUser className={`${isActive ? "" : "text-[32px]"}`} />
            </div>
            {
                isActive
                &&
                <div>
                    <p className="text-center md:text-[16px] mb-4">{details.description}</p>
                    {
                        details.points.map((p, i)=>(
                            <li className="font-regular text-[14px]">{p}</li>
                        ))
                    }    
                </div>
            }
        </div>
    )
}