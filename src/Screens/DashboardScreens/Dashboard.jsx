import { IoAdd } from "react-icons/io5";
import DashHeader from "../../components/DashHeader";
import DashEventCard from "../../components/DashEventCard";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import DashTicket from "../../components/DashTicket";
import useUser from "../../hooks/useUser";
import useEvents from "../../hooks/useEvents";
import OrganiserDashboard from "../../components/OrganiserDashboard";
import UserDashboard from "../../components/UserDashboard";
import { isUserBasic, isUserOrganiser } from "../../global/helpers"

export default function Dashboard(){
    const {toggleMenu, user} = useOutletContext()

    let [ongoingSoldTickets, setOngoingSoldTickets] = useState(null)
    let [allOrganiserTickets, setAllOrganiserTickets] = useState(null)
    
    const swiperEl = document.querySelectorAll('swiper-container')

    function initOverviewSlider(){
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
        
          if(swiperEl){
            // now we need to assign all parameters to Swiper element
            Object.assign(swiperEl[0], swiperParams);
            
            // and now initialize it
            swiperEl[0].initialize();
          }
          
    }

    useEffect(()=>{
        if(user && swiperEl.length > 0){
            initOverviewSlider()
        }
    },[user])

    return (
        <>
            <DashHeader title={"Dashboard"} dashnavtoggle={toggleMenu} />
            {
                isUserOrganiser(user)
                &&
                <OrganiserDashboard user={user} />
            }
            {
                isUserBasic(user)
                &&
                <UserDashboard />
            }
        </>
    )
}



