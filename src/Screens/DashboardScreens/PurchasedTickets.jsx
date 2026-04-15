import { IoAdd } from "react-icons/io5";
import DashHeader from "../../components/DashHeader";
import DashEventCard from "../../components/DashEventCard";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import DashTicket from "../../components/DashTicket";
import useUser from "../../hooks/useUser";
import useEvents from "../../hooks/useEvents";
import OrganiserDashboard from "../../modules/Dashboard/OrganiserDashboard";
import UserDashboard from "../../modules/Dashboard/UserDashboard";
import { isUserBasic, isUserOrganiser } from "../../global/helpers"
import { useUserProvider } from "../../contexts/UserContext";

export default function PurchasedTickets(){
    const {toggleMenu} = useOutletContext()
    let userProvider = useUserProvider()
    let user = userProvider?.user

    return (
        <>
            <DashHeader title={"My Tickets"} dashnavtoggle={toggleMenu} />
            {
                isUserBasic(user)
                &&
                <UserDashboard />
            }
        </>
    )
}



