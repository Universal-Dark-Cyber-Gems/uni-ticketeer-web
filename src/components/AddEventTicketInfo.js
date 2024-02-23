import { useEffect, useState } from "react"
import { IoImageOutline } from "react-icons/io5";

export default function AddEventTicketInfo(){
    let ticketsData = {
        event_id:"", 
        ticket_type: "", 
        ticket_price: "", 
        event_name: "",
        ticket_banner_url: "",
        ticket_quantity: "",
        restrictions: {}
    }

    let [ticketTypesCount, setTicketTypesCount] = useState(1)
    let [ticketsDataArr, setTicketsDataArr] = useState([ticketsData])

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

    function submitTicketForm(e){
        e.preventDefault()
        console.log(ticketsDataArr)
    }

    useEffect(()=>{
        if(ticketTypesCount < 1){
            setTicketTypesCount(1)
        }  
    },[ticketTypesCount])

    return (
        <form onSubmit={submitTicketForm} className="py-12 relative">
            <div className="flex flex-col items-center">
                <p className="text-primary-dark text-xl font-medium my-2">How many ticket types?</p>
                <CustomNumberInput value={ticketTypesCount} onChange={ticketTypesCountSet} />
            </div>
            
            <div className="md:w-[50%] m-auto">
                {tickets}
            </div>
            <div className="flex items-center">
                <input type="checkbox" />
                <p>i hearby accept the <span className="text-primary-orange">Terms and Conditions</span> provided by uniticketeer</p>
            </div>
            <button className="absolute bg-primary-dark right-0 p-2 text-primary-orange rounded-md">
                Create Ticket(s)
            </button>
        </form>
    )
}

function TicketTypeTab({ticketData, index, handleInputChange}){
    let [isRestriction, setIsRestriction] = useState(false)
    let [isAgeRestriction, setIsAgeRestriction] = useState(false)
    let [restrictions, setRestrictions] = useState({
        age: {
            range: "",
            benchmark: ""
        },
        gender: ""
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
                    range: "",
                    benchmark: ""
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
                gender: ""
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
            newval = {
                age: {
                    range: "",
                    benchmark: ""
                },
                gender: ""
            }
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

    return(
        <div className="w-full my-4 bg-[#FFF] p-4 my-2 border border-primary-dark rounded-md">
            <div className="md:flex items-center justify-between">
                <label htmlFor={"ticket"+index}><IoImageOutline /></label>
                <input type="file" accept="image/*" hidden id={"ticket"+index} />
                <input type="text" value={ticketData.ticket_type} name="ticket_type" placeholder="Enter ticket type/name" onChange={(e)=>{handleInputChange(e, index)}} className="border-2 border-primary-dark rounded-md md:w-[45%] w-full p-2 m-2" required />
                <input type="number" value={ticketData.ticket_price} name="ticket_price" placeholder="Enter ticket price" onChange={(e)=> {handleInputChange(e, index)}} className="border-2 border-primary-dark rounded-md md:w-[45%] w-full p-2 m-2" required />
            </div>
            <div>
                <div className="flex items-center">
                    <p className="text-[14px] text-primary-dark">Number of Tickets</p>
                    <input type="number" name="ticket_quantity" value={ticketData.ticket_quantity} onChange={(e)=>{handleInputChange(e, index)}} className="border-2 w-12 text-[12px] border-primary-dark rounded-md p-[2px] m-2" required />
                </div>
                <div className="flex">
                    <p className="text-lg font-bold my-2">Restrictions?</p>
                    <input type="checkbox" checked={isRestriction} onChange={()=>{setIsRestriction((prev)=>(!prev))}} className="mx-2"  />
                </div>
                {
                    isRestriction
                    &&
                    <div>
                        <div className="flex justify-between my-2">
                            <div className="flex items-center">
                                <p>Age Restrictions</p>
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
                                    <p>Range</p>
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
                                    <p>Benchmark</p>
                                    <input type="number" name="benchmark" value={restrictions.age.benchmark} onChange={handleRestrictionDataChange} className="w-10 border-2 border-primary-dark rounded-md" required={isAgeRestriction} />
                                </div>
                            }
                        </div>

                        <div className="flex justify-between my-4">
                            <div className="flex items-center">             
                                <p>Gender Restrictions</p>
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
        <div className={`p-2 ${active ? "bg-primary-dark text-primary-orange" : "text-primary-dark"} border border-primary-dark`}>
            <label htmlFor={range}>{range}</label>
            <input type="radio" name="range" value={range} id={range} onChange={handleChange} hidden />
        </div>
    )
}