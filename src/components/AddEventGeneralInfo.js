import { useEffect, useState } from "react"

import { TbMicrophone2 } from "react-icons/tb";
import { MdOutlineFastfood } from "react-icons/md";
import { BiParty } from "react-icons/bi";
import { MdPalette } from "react-icons/md";
import { RiBriefcase4Line } from "react-icons/ri";
import { IoFitnessOutline } from "react-icons/io5";
import { PiHandsPrayingFill } from "react-icons/pi";
import { GiSewingNeedle } from "react-icons/gi";
import { MdLaptop } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
import TicketInput from "./TicketInput";


export default function AddEventGeneralInfo(){
    let [isTicketed, setIsTicketed] = useState(false)
    let [createEventFormData, setCreateEventFormData] = useState(
        {
            title: "",
            venue: "",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            category: [],
            banner_img_url: "",
            additional_information: ""
        }
    )

    function handleCreateEventChange(e){
        //console.log(e)
        if(e.target.name === "category"){
            if(e.target.checked){
                setCreateEventFormData({
                    ...createEventFormData,
                    category: [...createEventFormData.category, e.target.value]
                })
            }else{
                setCreateEventFormData({
                    ...createEventFormData,
                    category: createEventFormData.category.filter((category)=>{return category !== e.target.value })
                })
            }
        }else{
            setCreateEventFormData(
            {
                ...createEventFormData,
                [e.target.name]: e.target.value
            })
        }
        

        console.log(createEventFormData)
    }
    return(
        <form className="md:w-[70%] py-4 m-auto">
                    <div>
                        <Title title={"Event name"} />
                        <TicketInput tagType={"input"} value={createEventFormData.title} name={"title"} onChange={handleCreateEventChange} placeholder={"Event name"} />
                    </div>
                    <div>
                        <Title title={"Categories"} />
                        <div className="flex gap-3 flex-wrap">
                            <CategoryTab category={"Music"} onChange={handleCreateEventChange} >
                                <TbMicrophone2 size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Food and Drink"} onChange={handleCreateEventChange}>
                                <MdOutlineFastfood size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Party and Nightlife"} onChange={handleCreateEventChange} >
                                <BiParty size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Art and Culture"} onChange={handleCreateEventChange} >
                                <MdPalette size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Career and Business"} onChange={handleCreateEventChange} >
                                <RiBriefcase4Line size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Fitness and Wellness"} onChange={handleCreateEventChange} >
                                <IoFitnessOutline size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Spirituality and Religion"} onChange={handleCreateEventChange} >
                                <PiHandsPrayingFill size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Fashion Design"} onChange={handleCreateEventChange} >
                                <GiSewingNeedle size={25} />
                            </CategoryTab>

                            <CategoryTab category={"Classes"} onChange={handleCreateEventChange} >
                                <MdLaptop size={25} />
                            </CategoryTab>
                        </div>
                    </div>
                    <div>
                        <Title title="Description" />
                        <TicketInput tagType={"textarea"} value={createEventFormData.additional_information} name={"additional_information"} onChange={handleCreateEventChange} />
                    </div>
                    <div>
                        <Title title="Location" />
                        <div className="flex gap-3 w-full">
                            <TicketInput
                                tagType={"select"}
                                label={"state"}
                            />
                            <TicketInput
                                tagType={"select"}
                                label={"city"}
                            />
                        </div>
                        <TicketInput
                            tagType={"input"}
                            placeholder={"Full address"}
                            label={"Full address"}
                            value={createEventFormData.venue}
                            name={"venue"}
                            onChange={handleCreateEventChange}
                        />
                        <div className="w-[50%] m-auto">
                            <TicketInput 
                                tagType={"input"} 
                                placeholder={"Address landmark"} 
                                label={"Address landmark"} 
                            />
                        </div>
                    </div>
                    <div>
                        <Title title={"Date and Time"} />
                        <div className="flex gap-3">
                            <TicketInput 
                                tagType={"input"} 
                                type={"date"} 
                                label={"start date"}
                                name={"start_date"}
                                value={createEventFormData.start_date}
                                onChange={handleCreateEventChange}
                            />
                            <TicketInput 
                                tagType={"input"}
                                type={"date"}
                                label={"end date"}
                                name={"end_date"}
                                value={createEventFormData.end_date}
                                onChange={handleCreateEventChange}
                            />
                        </div>
                        <div className="flex gap-3">
                            <TicketInput
                                tagType={"input"}
                                type={"time"}
                                label={"start time"}
                                name={"start_time"}
                                value={createEventFormData.start_time}
                                onChange={handleCreateEventChange}
                            />
                            <TicketInput
                                tagType={"input"}
                                type={"time"}
                                label={"stop time"}
                                name={"end_time"}
                                value={createEventFormData.end_time}
                                onChange={handleCreateEventChange}
                            />
                        </div>
                    </div>
                    <div>
                        <Title title={"Upload Image"} />
                        <div className="w-[50%] m-auto border border-primary-dark flex flex-col justify-center items-center pb-4">
                            <label htmlFor="event_banner">
                                <AiOutlinePicture size={150} fontWeight={2} />
                            </label>
                            <input type="file" id="event_banner" />
                            <div className="py-[3px] px-4 border border-primary-dark w-auto">
                                Upload file
                            </div>
                        </div>
                    </div>
                    <div>
                        <Title title="Ticket" />
                        <div className="flex gap-3 w-[50%] m-auto">
                            <TicketedTab priceType={"free"} isTicketed={isTicketed} setIsTicketed={setIsTicketed} />
                            <TicketedTab priceType={"paid"} isTicketed={isTicketed} setIsTicketed={setIsTicketed} />
                        </div>
                    </div>
                </form>
    )
}

function CategoryTab({category, children, onChange}){
    let [isChecked, setIsChecked] = useState(false)

    return(
        <div className="w-[72px]">
            <label htmlFor={category} >
                <div className={`flex items-center justify-center ${isChecked && "bg-gray-500"} border-[2px] border-primary-dark rounded-md p-2 h-[70px]`}>
                    {children}
                </div>
                <p className="text-center text-[10px] font-medium text-primary-dark">{category}</p>
            </label>
            <input type="checkbox" checked={isChecked} onChange={(e)=>{setIsChecked(!isChecked); onChange(e)}} name="category" value={category} id={category} hidden />
        </div>
    )
}

function Title({title}){
    return(
        <h3 className="text-primary-dark text-center my-4 font-medium text-lg">{title}</h3>
    )
}

function TicketedTab({priceType, isTicketed, setIsTicketed}){
    let [selected, setSelected] = useState("")

    function toggleIsTicketed(){
        setIsTicketed(priceType === "free" ? false : true)
    }

    useEffect(()=>{
        setSelected(isTicketed ? "paid" : "free")
    }, [isTicketed])

    return (
        <div onClick={toggleIsTicketed} className={`w-full text-center cursor-pointer ${priceType === selected ? "bg-primary-dark" : "bg-[#F7F7F7]"} text-primary-orange`}> 
            {priceType}
        </div> 
    )
}