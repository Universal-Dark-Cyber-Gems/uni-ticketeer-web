import { IoAdd } from "react-icons/io5";
import DashHeader from "../../components/DashHeader";
import DashEventCard from "../../components/DashEventCard";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import DashTicket from "../../components/DashTicket";

export default function Dashboard(){
    const toggleMenu = useOutletContext()
    let [activeOrganiserTab, setActiveOrganiserTab] = useState("ongoing events")
    let [activeUserTab, setActiveUserTab] = useState("ongoing tickets")
    function initOverviewSlider(){
        const swiperEl = document.querySelectorAll('swiper-container')
        console.log(swiperEl)
        const swiperParams = {
            autoplay:{
                delay: 3000,
            },
            breakpoints: {
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            },
            on: {
              init(swiper) {
                
              },
            },
          };
        
          // now we need to assign all parameters to Swiper element
          Object.assign(swiperEl[0], swiperParams);
          Object.assign(swiperEl[1], swiperParams);
        
          // and now initialize it
          swiperEl[0].initialize();
          swiperEl[1].initialize();
    }

    useEffect(()=>{
        initOverviewSlider()
    },[])
    return (
        <>
            <DashHeader title={"Dashboard"} dashnavtoggle={toggleMenu} />
            <div className="w-[100%]">
                <h2 className="text-xl py-8 font-bold text-primary-dark">Overview</h2>
               
                <div>
                    <swiper-container init="false" space-between="20" >
                        <swiper-slide>
                            <OverviewCard title={"ongoing events"} amount={2} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                        </swiper-slide>
                        <swiper-slide>
                            <OverviewCard title={"ongoing ticket sales"} amount={24} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                        </swiper-slide>
                        <swiper-slide>
                            <OverviewCard title={"all time events"} amount={7} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                        </swiper-slide>
                        <swiper-slide>
                            <OverviewCard title={"all time ticket sales"} amount={400} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                        </swiper-slide>
                    </swiper-container>
                </div>
            </div>
            <div>
                <div className="flex justify-between pt-12 pb-8">
                    <h2 className="text-xl font-bold text-primary-dark">Your Events</h2>
                    <Link to={"/dashboard/event/create"}>
                        <div className="flex items-center bg-primary-orange p-2 mr-8 rounded-full font-medium"> 
                            New Event 
                            <IoAdd size={20} className=" cursor-pointer"/>
                        </div>
                    </Link>
                </div>
                <div className="flex justify-even gap-2 flex-wrap">
                    <DashEventCard />
                    <DashEventCard />
                </div>
            </div>
            <div className="py-4 w-[100%]">
                <h2 className="text-xl py-8 font-bold text-primary-dark">Purchased Tickets Overview</h2>
                <div>
                    <swiper-container init="false" space-between="20" >
                        <swiper-slide>
                            <OverviewCard title={"ongoing tickets"} amount={2} active={activeUserTab} setActive={setActiveUserTab} />
                        </swiper-slide>
                        <swiper-slide>
                            <OverviewCard title={"all tickets purchased"} amount={13} active={activeUserTab} setActive={setActiveUserTab} />
                        </swiper-slide>
                    </swiper-container>
                </div>
                <h2 className="text-xl py-8 font-bold text-primary-dark">Purchased Tickets</h2>
                <div className="md:flex justify-even">
                    <DashTicket />
                    <DashTicket />
                </div>
            </div>
        </>
    )
}



function OverviewCard({title, amount, active, setActive}){
    return(
        <div onClick={()=>{setActive(title)}} className={`cursor-pointer ${active === title && "bg-gradient-to-tl from-primary-dark to-purple-400"} border-[2px] border-primary-dark p-3 rounded-2xl shadow-xl`}>
            <p className={`text-center ${active === title && "text-primary-light"} text-primary-dark capitalize text-lg font-medium`}>{title}</p>
            <p className={`text-center ${active === title && "text-primary-light"} text-primary-dark text-lg font-medium`}>{amount}</p>
        </div>
    )
}