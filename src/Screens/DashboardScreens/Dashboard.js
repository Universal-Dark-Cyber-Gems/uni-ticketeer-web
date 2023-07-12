import { IoAdd } from "react-icons/io5";
import DashHeader from "../../components/DashHeader";
import DashEventCard from "../../components/DashEventCard";

export default function Dashboard(){
    return (
        <>
            <DashHeader title={"Dashboard"} />
            <div>
                <h2>Overview</h2>
                <p>number of ongoing events to hold</p>
                <p>number of ongoing tickets sold</p>
                <p>total number of events held</p>
                <p>total number of tickets sold</p>
            </div>
            <div>
                <div className="flex justify-between p-12">
                    <h2 className="text-xl font-bold text-primary-dark">Your Events</h2>
                    <div className="flex items-center bg-primary-orange p-2 rounded-full font-medium"> 
                        New Event 
                        <IoAdd size={20} />
                    </div>
                </div>
                <div className="flex justify-between flex-wrap">
                    <DashEventCard />
                    <DashEventCard />
                    <DashEventCard />
                    <DashEventCard  />
                </div>
            </div>
        </>
    )
}