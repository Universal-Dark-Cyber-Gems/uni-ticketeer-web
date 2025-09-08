import { useState } from "react";
import DashTicket from "../../components/DashTicket";
import OverviewCard from "../../components/OverviewCard";
import useTickets from "../../hooks/useTickets";
import CustomLoader from "../../components/CustomLoader";
import { Link } from "react-router-dom";

export default function UserDashboard(){
    let { purchasedTickets, getPurchasedTickets, ticketsLoading } = useTickets()


    return(
        <div className="py-4 w-[100%]">
            {/* <h2 className="text-xl py-4 font-bold text-primary-dark">Purchased Tickets Overview</h2> */}
            <h2 className="text-xl py-4 font-bold text-primary-dark">Active Tickets</h2>
            {
                ticketsLoading
                ?
                <div>
                    <CustomLoader />
                </div>
                :
                purchasedTickets
                ?
                <div className="md:flex justify-even">
                    <DashTicket />
                    <DashTicket />
                </div>
                :
                <div>
                    <div className="text-center">
                        <p className="text-primary-dark">You don't have any active tickets</p>
                        <Link to={"/dashboard/events"} className="text-primary-orange underline">Go get it</Link>
                    </div>
                </div>
            }
            <h2 className="text-xl py-8 font-bold text-primary-dark">Past Tickets</h2>
            {
                ticketsLoading
                ?
                <div>
                    <CustomLoader />
                </div>
                :
                purchasedTickets
                ?
                <div className="md:flex justify-even">
                    <DashTicket />
                    <DashTicket />
                </div>
                :
                <div>
                    <div className="text-center">
                        <p className="text-primary-dark">You haven't purchased any tickets yet</p>
                        <Link to={"/dashboard/events"} className="text-primary-orange underline">Go get it</Link>
                    </div>
                </div>
            }
        </div>
    )
}