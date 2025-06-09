import { useEffect, useState } from "react"
import { IoAdd, IoImageOutline, IoTrashBin } from "react-icons/io5";
import useTickets from "../../hooks/useTickets";
import { validateTicketArray } from "../../utils/validateTicketArray";
import useImage from "../../hooks/useImage";
import { useNavigate, useParams } from "react-router-dom";
import { editEventApi } from "../../api/eventsapi";
import useEvents from "../../hooks/useEvents";
import { toast } from "react-toastify";
import { useEventProvider } from "../../contexts/EventContext";

export default function EditTicket(){
    let {eventid, ticketid, eventname} = useParams()
    let [ticketData, setTicketData] = useState({
        event_id: eventid,
        ticket_type: "", 
        ticket_price: "", 
        event_name: eventname,
        ticket_banner_url: "",
        ticket_quantity: undefined,
        restrictions: undefined
    })

    let { tickets, ticketStatus, getSingleTicket, editTicket, ticketsLoading } = useTickets()
    let navigate = useNavigate()
    let [error, setError] = useState({error: false, message: ""})


    function handleInputChange(e, index){
        console.log(ticketData)
        ticketData[e.target.name] = e.target.value
        setTicketData({...ticketData})
    }

    async function submitTicketForm(e){
        e.preventDefault()
        console.log("data being submited", ticketData)
        let result = await editTicket(ticketid, ticketData)
        if(!result.success){
            toast(ticketStatus.message)
            return
        }else{
            toast.success("Ticket edited Successfully", {position: "top-center"})
            navigate("/dashboard")
        }
    }

    useEffect(()=>{
       getSingleTicket(ticketid).then((res)=>{
           console.log("single ticket", res.ticket)
           setTicketData({
                event_id: res?.ticket.event_id,
                ticket_type: res?.ticket.ticket_type, 
                ticket_price: res?.ticket.ticket_price, 
                event_name: res?.ticket.event_name,
                ticket_banner_url: res?.ticket.ticket_banner_url,
                ticket_quantity: res?.ticket.ticket_quantity || undefined,
                restrictions: res?.ticket.restrictions || undefined
           })
       })
    },[tickets])

    return (
        <form onSubmit={submitTicketForm} className="py-12 relative">
            {/* <div className="flex flex-col items-center">
                <p className="text-primary-dark text-xl font-medium my-2">How many ticket types?</p>
                <CustomNumberInput value={ticketTypesCount} onChange={ticketTypesCountSet} />
            </div> */}
            <div className="text-bold text-center text-[20px]"> {eventname} </div>
            
            <div className="md:w-[70%] m-auto">
                {
                    error.error 
                    && 
                    <div className="text-center text-red-500 text-bold">
                        {error.message}
                    </div>
                }
                <TicketTypeTab ticketData={ticketData} handleInputChange={handleInputChange} />
            </div>
            <div className="flex gap-2 justify-center items-center">
                <input type="checkbox" checked />
                <p className="text-center">i hearby accept the <span className="text-primary-orange">Terms and Conditions</span> provided by emume</p>
            </div>
            <div className="flex justify-between items-center">
                
                <button disabled={ticketsLoading} className={`absolute ${ticketsLoading ? "bg-[#CCC]" : "bg-primary-dark"} right-0 py-2 px-4 text-primary-orange rounded-full`}>
                    Edit Ticket
                </button>
            </div>
        </form>
    )
}

function TicketTypeTab({ticketData, index, handleInputChange}){
    let { uploadImage, isImageLoading, imageStatus } = useImage()
    let [isRestriction, setIsRestriction] = useState(false)
    let [isAgeRestriction, setIsAgeRestriction] = useState(false)
    let [ticketImage, setTicketImage] = useState({blob: "", isUploaded: false})
    let [restrictions, setRestrictions] = useState({
        age: {
            range: undefined,
            benchmark: undefined
        },
        gender: undefined
    })
    let [isGenderRestriction, setIsGenderRestriction] = useState(false)
    
    function handleRestrictionDataChange(e){
        let newRestrictionsValue;
        if(e.target.name === "range"){
            newRestrictionsValue = {
                ...restrictions, 
                age: {...restrictions.age, range: e.target.value}
            }
            setRestrictions(newRestrictionsValue)
        }else if(e.target.name === "benchmark"){
            newRestrictionsValue = {
                ...restrictions,
                age: {...restrictions.age, benchmark: e.target.value}
            }
            setRestrictions(newRestrictionsValue)
        }else{
            newRestrictionsValue = {
                ...restrictions,
                [e.target.name]: e.target.value
            }
            setRestrictions(newRestrictionsValue)
        }

        console.log(restrictions, "new_value:", newRestrictionsValue)
        handleInputChange({
            target:{
                name: "restrictions",
                value: newRestrictionsValue
            }
        }, index)
    }

    useEffect(()=>{
        //the newval variable is used so we don't depend on state, which is not available until the next render
        let newval = {
            ...restrictions
        }

        if(!isAgeRestriction){
            newval = {
                ...newval,
                age: {
                    range: undefined,
                    benchmark: undefined
                }
            }
            handleInputChange({
                target:{
                    name: "restrictions",
                    value: newval
                }
            }, index)
            setRestrictions(newval)
            console.log("resetting due to age turn off", newval)
        }

        if(!isGenderRestriction){
            newval = {
                ...newval,
                gender: undefined
            }
            handleInputChange({
                target:{
                    name: "restrictions",
                    value: newval
                }
            }, index)
            setRestrictions(newval)
            console.log("based on gender turn off", newval)
        }

        if(!isRestriction){
            newval = undefined
            handleInputChange({
                target:{
                    name: "restrictions",
                    value: newval
                }
            }, index)
            setRestrictions(newval)
            console.log("based on turning off restrictions", newval)
        }
    }, [isAgeRestriction, isGenderRestriction, isRestriction])

    function selectImage(e){
        setTicketImage({blob: e.target.files[0], isUploaded: false});
        console.log(e.target.files[0])
        handleInputChange({
            target:{
                name: "ticket_banner_url",
                value: ""
            }
        }, index)
    }

    async function uploadimageAndGetUrl(){
        let imageUrl = await uploadImage(ticketImage.blob)
            console.log("image url:", imageUrl)

            if(imageStatus.error) return

            handleInputChange({
                target: {
                    name: "ticket_banner_url",
                    value: imageUrl
                }
            }, index)

            setTicketImage((prev)=>{
                return { ...prev, isUploaded: true}
            })
    }

    console.log("ticket image", ticketImage)
    return(
        <div className="flex justify-between w-full my-4 bg-[#FFF] p-4 my-2 border border-primary-dark rounded-md">
            <div className="w-[50%] my-4 items-center justify-between bg-[#D9D9D9] rounded-md">
                <label htmlFor={`ticket${index}`}>
                    {
                        ticketImage.blob
                        ?
                        <div>
                            <img src={URL.createObjectURL(ticketImage.blob)} alt="banner" className="w-[70%] m-auto" />
                        </div>
                        :
                        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
                            <img src={ticketData.ticket_banner_url} alt="banner" className="w-[70%] m-auto" />
                        </div>
                    }
                </label>
                {
                    ticketImage.blob
                    &&
                    <div className={`${ticketImage.isUploaded ? "" : "cursor-pointer"} text-[12px] text-center border-[1px] border-primary-dark rounded-md p-[2px] w-full m-auto`} onClick={ticketImage.isUploaded ? undefined : uploadimageAndGetUrl}>
                        {
                            imageStatus.error
                            ?
                            <span>{imageStatus.message}.. Try again</span>
                            :
                            isImageLoading
                            ?
                            <span>uploading image ...</span>
                            :
                            ticketImage.isUploaded 
                            ? 
                            <span className="text-green-500">Image has been uploaded</span> 
                            : 
                            <span>upload image</span>
                        }
                    </div>
                }
                <input type="file" accept="image/*" onInput={selectImage} hidden={true} id={`ticket${index}`} />
            </div>
            <div className="w-[45%]">
                <div>
                    <div className="font-regular text-primary-dark">Ticket Name</div>
                    <input type="text" value={ticketData?.ticket_type} name="ticket_type" placeholder="Enter ticket type/name" onChange={(e)=>{handleInputChange(e, index)}} className="border-2 border-primary-dark rounded-md w-full p-[2px] m-[2px]" required />
                </div>
                <div>
                    <div className="font-regular text-primary-dark">Price</div>
                    <input type="number" value={ticketData?.ticket_price} name="ticket_price" placeholder="Enter ticket price" onChange={(e)=> {handleInputChange(e, index)}} className="border-2 border-primary-dark rounded-md w-full p-[2px] m-[2px]" required />
                </div>
                <div className="flex items-center">
                    <p className="text-[14px] text-primary-dark">Number of Tickets</p>
                    <input type="number" name="ticket_quantity" value={ticketData?.ticket_quantity} onChange={(e)=>{handleInputChange(e, index)}} className="border-2 w-12 text-[12px] border-primary-dark rounded-md p-[2px] m-2" />
                </div>
                <div className="h-[1px] w-full bg-[#CCC]" />
                <div className="flex">
                    <p className="font-medium text-primary-dark">Restrictions?</p>
                    <input type="checkbox" checked={isRestriction} onChange={()=>{setIsRestriction((prev)=>(!prev))}} className="mx-2"  />
                </div>
                {
                    isRestriction
                    &&
                    <div>
                        <div className="flex justify-between my-2">
                            <div className="flex items-center">
                                <p>Age</p>
                                <input 
                                    type="checkbox" 
                                    checked={isAgeRestriction} 
                                    onChange={()=>{setIsAgeRestriction((prev)=>(!prev))}}
                                    className="mx-2"
                                />
                            </div>
                            {
                                isAgeRestriction
                                &&
                                <div>
                                    <p className="text-[14px]">Range</p>
                                    <div className="flex">
                                        <AgeRangeTab range={"over"} selectedRange={restrictions?.age.range} handleChange={handleRestrictionDataChange} />
                                        <AgeRangeTab range={"under"} selectedRange={restrictions?.age.range} handleChange={handleRestrictionDataChange} />
                                    </div>
                                </div>
                            }
                            {
                                isAgeRestriction
                                &&
                                <div>
                                    <p className="text-[14px]">Benchmark</p>
                                    <input type="number" name="benchmark" value={restrictions?.age.benchmark} onChange={handleRestrictionDataChange} className="w-10 border-2 border-primary-dark rounded-md" required={isAgeRestriction} />
                                </div>
                            }
                        </div>

                        <div className="flex justify-between my-4">
                            <div className="flex items-center">             
                                <p>Gender</p>
                                <input
                                    type="checkbox"
                                    checked={isGenderRestriction}
                                    onChange={()=>{setIsGenderRestriction((prev)=>(!prev))}}
                                    className="mx-2"
                                />
                            </div>
                            {
                                isGenderRestriction
                                &&
                                <div className="flex">
                                    <div className="mx-2">
                                        <label>male</label>
                                        <input type="radio" name="gender" value={"male"} onChange={handleRestrictionDataChange} />
                                    </div>
                                    <div className="mx-2">
                                        <label>female</label>
                                        <input type="radio" name="gender" value={"female"} onChange={handleRestrictionDataChange} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

function CustomNumberInput({value, onChange}){
    function increment(e){
        e.preventDefault()
        onChange(value+1)
    }

    function decrement(e){
        e.preventDefault()
        if(value > 1){
            onChange(value-1)
        }
        
    }
    return(
        <div className="flex">
            <button onClick={decrement} className="cursor-pointer p-4 bg-primary-dark text-primary-orange text-3xl text-center">-</button>
            <input value={value} onChange={(e)=>{onChange(e.target.value)}} type="number" disabled className="w-[50px] p-2 text-xl font-medium" />
            <button onClick={increment} className="cursor-pointer p-4 bg-primary-dark text-primary-orange text-3xl text-center">+</button>
        </div>
    )
}

function AgeRangeTab({range, selectedRange, handleChange}){
    let active = range === selectedRange ? true : false
    return(
        <div className={`p-[2px] ${active ? "bg-primary-dark text-primary-orange" : "text-primary-dark"} border border-primary-dark`}>
            <label htmlFor={range} className="text-[12px]">{range}</label>
            <input type="radio" name="range" value={range} id={range} onChange={handleChange} hidden />
        </div>
    )
}