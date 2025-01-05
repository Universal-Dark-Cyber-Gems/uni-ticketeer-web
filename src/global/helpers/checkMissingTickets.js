import { getAllTicketsByEvent } from "../../api/ticketsapi"

async function checkMissingTickets(eventsArr){
    let isMissing = false;
    let eventId;
    eventsArr.forEach(event => {
        if(event.is_ticketed){
            let res = getAllTicketsByEvent(event._id)
            if(res.result.status === 404){
                isMissing = true
                eventId = event?._id
                return
            }
        }
    });

    return { isMissing, eventId}
}

export { checkMissingTickets }