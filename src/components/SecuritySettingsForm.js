import TicketInput from "./TicketInput";

export default function SecuritySettingsForm(){
    return(
        <form className="relative p-4 pb-16 bg-[#FFF] my-4">
            <TicketInput tagType={"input"} type={"password"} label={"Enter previous password"} />
            <TicketInput tagType={"input"} type={"password"} label={"Enter new password"} />
            <TicketInput tagType={"input"} type={"password"} label={"Confirm new password"} />
        </form>
    )
}