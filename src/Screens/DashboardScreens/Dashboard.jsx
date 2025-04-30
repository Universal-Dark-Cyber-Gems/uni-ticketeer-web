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



