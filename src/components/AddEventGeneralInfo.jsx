import { useContext, useEffect, useState } from "react"

import { TbMicrophone2 } from "react-icons/tb";
import { MdOutlineFastfood, MdTheaterComedy } from "react-icons/md";
import { BiParty } from "react-icons/bi";
import { MdPalette } from "react-icons/md";
import { RiBriefcase4Line } from "react-icons/ri";
import { IoFitnessOutline } from "react-icons/io5";
import { PiHandsPrayingFill } from "react-icons/pi";
import { GiSewingNeedle } from "react-icons/gi";
import { MdLaptop } from "react-icons/md";
import { AiOutlinePicture } from "react-icons/ai";
import TicketInput from "./TicketInput";
import useImage from "../hooks/useImage";
import states from "../global/states";
import useEvents from "../hooks/useEvents";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import dayjs from "dayjs";



export default function AddEventGeneralInfo({moveToTickets}){
    let navigate = useNavigate()
    let user = useContext(UserContext)
    let nextDay = dayjs().add(1, "day").format("YYYY-MM-DD")
    const {isImageLoading, imageStatus, uploadImage} = useImage()
    let { createEvent, eventsLoading, eventsStatus } = useEvents()
    let [isTicketed, setIsTicketed] = useState(false)
    let [bannerImg, setBannerImg] = useState(null)
    let [statesArr, setStatesArr] = useState([])
    let [citiesArr, setCitiesArr] = useState([])
    let [state, setState] = useState("")
    let [city, setCity] = useState("")
    let [landmark, setLandmark] = useState("")
    let [createEventFormData, setCreateEventFormData] = useState(
        {
            title: "",
            venue: "",
            organiser: user?._id,
            organiser_name: user?.username,
            start_date: "",
            end_date: undefined,
            start_time: "",
            end_time: undefined,
            category: [],
            banner_image_url: "",
            additional_information: undefined
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

    async function handleSubmitEvent(e){
        e.preventDefault();
        let eventData = {
            ...createEventFormData, 
            is_ticketed: isTicketed,
            location: {
                country: user?.location.country,
                state,
                city,
                landmark: landmark || undefined
            }
        }
        console.log(eventData)
        let result = await createEvent(eventData)
        if(!result.success) return;
        if(eventData.is_ticketed){
            moveToTickets(result.eventId, eventData.title)
        }else{
            navigate("/dashboard")
        }
    }

    async function handleUploadImage(){
        if(bannerImg){
            let imageUrl = await uploadImage(bannerImg)
            console.log("image url:", imageUrl)
            handleCreateEventChange({
                target: {
                    name: "banner_image_url",
                    value: imageUrl
                }
            })
        }
    }

    useEffect(()=>{
        for(let i=0; i < states.length; i++){
            setStatesArr((prev)=>[...prev, states[i].name])
        }
    }, [])

    useEffect(()=>{
        if(state !== ""){
            let st = states.find((singleState)=>singleState.name === state)
            setCitiesArr(st.lgas)
        }
    },[state])

    return(
        <form onSubmit={handleSubmitEvent} className="md:w-[70%] py-4 m-auto">
                    <div>
                        <Title title={"Event name *"} />
                        <TicketInput 
                            tagType={"input"} 
                            required
                            value={createEventFormData.title} 
                            name={"title"} 
                            onChange={handleCreateEventChange} 
                            placeholder={"Event name"} 
                        />
                    </div>
                    <div>
                        <Title title={"Categories *"} />
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

                            <CategoryTab category={"Comedy"} onChange={handleCreateEventChange}>
                                <MdTheaterComedy size={25} />
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
                                required
                                label={"state"}
                                placeholder={"Select State"}
                                value={state}
                                options={statesArr}
                                onChange={(e)=>{setState(e.target.value)}}
                            />
                            <TicketInput
                                tagType={"select"}
                                required
                                label={"city"}
                                placeholder={"Select City"}
                                value={city}
                                options={citiesArr && citiesArr}
                                onChange={(e)=>{setCity(e.target.value)}}
                            />
                        </div>
                        <TicketInput
                            tagType={"input"}
                            required
                            placeholder={"Full address"}
                            label={"Venue"}
                            value={createEventFormData.venue}
                            name={"venue"}
                            onChange={handleCreateEventChange}
                        />
                        <div className="w-[50%] m-auto">
                            <TicketInput 
                                tagType={"input"} 
                                value={landmark}
                                onChange={(e)=>{setLandmark(e.target.value)}}
                                placeholder={"Popular landmark near event address"} 
                                label={"Landmark (optional)"} 
                            />
                        </div>
                    </div>
                    <div>
                        <Title title={"Date and Time"} />
                        <div className="flex gap-3">
                            <TicketInput 
                                tagType={"input"}
                                required 
                                type={"date"} 
                                min={nextDay}
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
                                required
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
                            <div className="text-[10px] text-primary-dark">click on the banner to select an image </div>
                            {
                                bannerImg !== null
                                ?
                                <label htmlFor="event_banner">
                                    <img src={URL.createObjectURL(bannerImg)} alt="banner" className="w-[70%] m-auto" />
                                </label>
                                :
                                <label htmlFor="event_banner" className="cursor-pointer border border-primary-dark">
                                    <AiOutlinePicture size={150} fontWeight={2} />
                                    <p className="text-[12px] text-center">select image</p>
                                </label>
                            }
                            <input type="file" id="event_banner" accept="image/*" hidden={true} onInput={(e)=>{setBannerImg(e.target.files[0] || bannerImg); console.log(URL.createObjectURL(e.target.files[0]), e.target.files[0])}} />
                            { imageStatus.error && <div className="text-center text-red-500 font-medium"> {imageStatus.message} </div>}
                            <div onClick={isImageLoading ? undefined : handleUploadImage} className="py-[3px] cursor-pointer px-4 border border-primary-dark my-2 w-auto">
                                { isImageLoading ? "Uploading..." : "Upload file" }
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
                    {eventsStatus.error && <div className="text-center text-red-500 font-medium"> {eventsStatus.message} </div>}
                    <div className="flex justify-center">
                        <button 
                            className={`p-2 m-4 text-center ${eventsLoading ? "bg-grey-500" : "bg-primary-dark"} text-primary-orange rounded-md`}
                        >
                            {
                                eventsLoading
                                ?
                                "..."
                                :
                                isTicketed
                                ?
                                "Submit and proceed to add tickets"
                                :
                                "Create Event (Without tickets)"
                            }
                        </button>
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