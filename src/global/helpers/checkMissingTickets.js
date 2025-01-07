import { getAllTicketsByEvent } from "../../api/ticketsapi"

async function checkMissingTickets(eventsArr){
    
    for(let i=0; i<eventsArr.length; i++){
        if(eventsArr[i].is_ticketed){
            let res = await getAllTicketsByEvent(eventsArr[i]._id)
            if(res?.error?.response?.status == 404){
                return { isMissing: true, eventId: eventsArr[i]?._id, eventName: eventsArr[i]?.title}
            }
        }
    };

    return { isMissing: false, eventId: null}
}

export { checkMissingTickets }