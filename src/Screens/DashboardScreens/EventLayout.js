import { Outlet, useOutletContext } from "react-router-dom";
import DashHeader from "../../components/DashHeader";

export default function EventLayout(){
    const toggleMenu = useOutletContext()
    return(
        <div>
            <DashHeader title={"Events"} dashnavtoggle={toggleMenu} />
             <Outlet />
        </div>
       
    )
}