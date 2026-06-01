import { CiCalendar, CiClock2 } from "react-icons/ci"
import { TbCategory2 } from "react-icons/tb"
import EventDetailCard from "../components/NewEventCard"
import NewEventCard from "../components/NewEventCard"

export default function SearchResultComponent(){
    const filters = [
        {
            label: "Date Range",
            icon: <CiCalendar className="font-bold" />
        },
        {
            label: "Time of Day",
            icon: <CiClock2 />
        },
        {
            label: "Category",
            icon: <TbCategory2 />
        }
    ]
    return(
        <div className="text-primary-dark">
            <div className="flex items-center justify-around my-4">
                <div className="md:flex items-end gap-2 w-[50%]">
                    <p className="md:text-[24px]">Enugu</p>
                    <p className="md:text-[12px] text-primary-dark/50">2.4k results</p>
                </div>
                <div>
                    <div className="p-1 rounded-md bg-[#E4E4E4]">
                        <input 
                            className="outline-none bg-inherit"
                            placeholder="Search Query"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex gap-2">
                    {
                        filters.map((filter)=>(
                            <div className="bg-[#E4E4E4] font-medium px-2 py-2 rounded-md cursor-pointer flex gap-1 items-center">
                                {filter.icon}
                                {filter.label}
                            </div>
                        ))
                    }
                </div>
                <div className="md:flex flex-wrap lg:gap-10 my-4 justify-between">
                    {
                        Array.from({length: 20}).map(()=>(
                            <NewEventCard />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}