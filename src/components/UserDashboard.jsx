import { useState } from "react";
import DashTicket from "./DashTicket";
import OverviewCard from "./OverviewCard";

export default function UserDashboard({user}){
    let [activeUserTab, setActiveUserTab] = useState("ongoing tickets")

    return(
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
    )
}