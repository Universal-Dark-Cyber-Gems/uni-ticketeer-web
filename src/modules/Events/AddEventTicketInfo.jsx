import { useEffect, useState } from "react"
import { IoAdd, IoImageOutline, IoTrashBin } from "react-icons/io5";
import useTickets from "../../hooks/useTickets";
import { validateTicketArray } from "../../utils/validateTicketArray";
import useImage from "../../hooks/useImage";
import { useNavigate } from "react-router-dom";
import { editEventApi } from "../../api/eventsapi";
import useEvents from "../../hooks/useEvents";
import { toast } from "react-toastify";

export default function AddEventTicketInfo({eventName, eventId}){
    let ticketsData = {
        event_id: eventId, 
        ticket_type: "", 
        ticket_price: "", 
        event_name: eventName,
        ticket_banner_url: "",
        ticket_quantity: undefined,
        restrictions: undefined
    }

    let { editEvent } = useEvents()
    let { createTicket, ticketsLoading, ticketStatus } = useTickets(eventId)
    let navigate = useNavigate()

    let [ticketTypesCount, setTicketTypesCount] = useState(1)
    let [ticketsDataArr, setTicketsDataArr] = useState([ticketsData])
    let [error, setError] = useState({error: false, message: ""})

    let tickets = ticketsDataArr?.map((ticketData, i)=>{
        return (
            <TicketTypeTab key={"Tab"+i} ticketData={ticketData} index={i} handleInputChange={handleInputChange} />
        )
    })
    

    function handleInputChange(e, index){
        console.log(ticketsDataArr)
        ticketsDataArr[index][e.target.name] = e.target.value
        setTicketsDataArr([...ticketsDataArr])
    }

    function ticketTypesCountSet(newValue){
        setTicketTypesCount(newValue)
        if(newValue > ticketsDataArr.length){
            ticketsDataArr.push(ticketsData)
            setTicketsDataArr(ticketsDataArr)
        }else if(newValue < ticketsDataArr.length){
            ticketsDataArr.pop()
            setTicketsDataArr(ticketsDataArr)
        }
    }

    function addNewTicket(){
        let valResult = validateTicketArray(ticketsDataArr)
        if(valResult.error){
            toast(valResult.message, {position: 'top-center'})
            return
        }
        if(ticketsDataArr.length < 4){
            ticketTypesCountSet(ticketsDataArr.length + 1)
        }else{
            toast.info("maximum amount of ticket reached")
        }
    }

    function removeLastTicket(){
        ticketTypesCountSet(ticketsDataArr.length - 1)
    }

    async function submitTicketForm(e){
        e.preventDefault()
        console.log(ticketsDataArr)
        let validationResult = validateTicketArray(ticketsDataArr)
        if(validationResult.error) {
            toast(validationResult.message, {position: "top-center"})
        }else {
            for(let i=0; i < ticketsDataArr.length; i++){
                let result = await createTicket(ticketsDataArr[i])
                if(!result.success){
                    setTicketsDataArr([...ticketsDataArr])
                    toast(ticketStatus.message)
                    return
                }else{
                    ticketsDataArr.filter((ticket, index)=>{
                        return index !== i
                    })
                }
            }
            let editEventRes = await editEvent(eventId, {status: 'published'})
            if(editEventRes.success){
                navigate("/dashboard")
            }
        }
    }

    useEffect(()=>{
        if(ticketTypesCount < 1){
            setTicketTypesCount(1)
        }  
    },[ticketTypesCount])

    return (
        <form onSubmit={submitTicketForm} className="py-12 relative">
            {/* <div className="flex flex-col items-center">
                <p className="text-primary-dark text-xl font-medium my-2">How many ticket types?</p>
                <CustomNumberInput value={ticketTypesCount} onChange={ticketTypesCountSet} />
            </div> */}
            <div className="text-bold text-center text-[20px]"> {eventName} </div>
            
            <div className="md:w-[70%] m-auto">
                {
                    error.error 
                    && 
                    <div className="text-center text-red-500 text-bold">
                        {error.message}
                    </div>
                }
                {tickets}
                {
                    tickets.length > 1
                    &&
                    <div onClick={removeLastTicket} className="cursor-pointer flex  ml-auto justify-center items-center gap-2 w-[120px] px-2 py-[2px] text-[12px] text-red-500 border-[1px] border-red-500 text-center rounded-full">
                        remove ticket
                        <IoTrashBin />
                    </div>
                }
            </div>
            <div className="flex gap-2 justify-center items-center">
                <input type="checkbox" checked />
                <p className="text-center">i hearby accept the <span className="text-primary-orange">Terms and Conditions</span> provided by emume</p>
            </div>
            <div className="flex justify-between items-center">
                <div onClick={addNewTicket} className="flex cursor-pointer items-center gap-2 border-[1px] border-[#CCC] py-2 px-4 rounded-full">
                    <IoAdd />
                    Add Ticket
                </div>
                <button disabled={ticketsLoading} className={`absolute ${ticketsLoading ? "bg-[#CCC]" : "bg-primary-dark"} right-0 py-2 px-4 text-primary-orange rounded-full`}>
                    Create Ticket(s)
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

            if(imageStatus.error){
                return
            }else{

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

    }

    function removeImage(){
        handleInputChange({
            target: {
                name: "ticket_banner_url",
                value: ""
            }
        }, index)

        setTicketImage({blob: "", isUploaded: false})
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
                            <IoImageOutline />
                            <div className="text-[12px] text-center">click This box to upload ticket image</div>
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
                {
                    ticketImage.blob
                    &&
                    <div onClick={removeImage} className="cursor-pointer text-[12px] text-center border-[1px] border-primary-dark rounded-md p-[2px] w-full m-auto">
                        Remove Image
                    </div>
                }
                <input type="file" accept="image/*" onInput={selectImage} hidden={true} id={`ticket${index}`} />
            </div>
            <div className="w-[45%]">
                <div>
                    <div className="font-regular text-primary-dark">Ticket Name</div>
                    <input type="text" value={ticketData.ticket_type} name="ticket_type" placeholder="Enter ticket type/name" onChange={(e)=>{handleInputChange(e, index)}} className="border-2 border-primary-dark rounded-md w-full p-[2px] m-[2px]" required />
                </div>
                <div>
                    <div className="font-regular text-primary-dark">Price</div>
                    <input type="number" value={ticketData.ticket_price} name="ticket_price" placeholder="Enter ticket price" onChange={(e)=> {handleInputChange(e, index)}} className="border-2 border-primary-dark rounded-md w-full p-[2px] m-[2px]" required />
                </div>
                <div className="flex items-center">
                    <p className="text-[14px] text-primary-dark">Number of Tickets</p>
                    <input type="number" name="ticket_quantity" value={ticketData.ticket_quantity} onChange={(e)=>{handleInputChange(e, index)}} className="border-2 w-12 text-[12px] border-primary-dark rounded-md p-[2px] m-2" />
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
                                        <AgeRangeTab range={"over"} selectedRange={restrictions.age.range} handleChange={handleRestrictionDataChange} />
                                        <AgeRangeTab range={"under"} selectedRange={restrictions.age.range} handleChange={handleRestrictionDataChange} />
                                    </div>
                                </div>
                            }
                            {
                                isAgeRestriction
                                &&
                                <div>
                                    <p className="text-[14px]">Benchmark</p>
                                    <input type="number" name="benchmark" value={restrictions.age.benchmark} onChange={handleRestrictionDataChange} className="w-10 border-2 border-primary-dark rounded-md" required={isAgeRestriction} />
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