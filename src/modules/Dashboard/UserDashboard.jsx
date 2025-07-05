import { useState } from "react";
import DashTicket from "../../components/DashTicket";
import OverviewCard from "../../components/OverviewCard";

export default function UserDashboard({user}){
    let [activeUserTab, setActiveUserTab] = useState("ongoing tickets")

    return(
        <div className="py-4 w-[100%]">
                    <h2 className="text-xl py-4 font-bold text-primary-dark">Purchased Tickets Overview</h2>
                    <h2 className="text-xl py-4 font-bold text-primary-dark">Active Tickets</h2>
                    <div className="md:flex justify-even">
                        <DashTicket />
                        <DashTicket />
                    </div>
                    <h2 className="text-xl py-8 font-bold text-primary-dark">Past Tickets</h2>
                    <div className="md:flex justify-even">
                        <DashTicket />
                        <DashTicket />
                    </div>
                </div>
    )
}