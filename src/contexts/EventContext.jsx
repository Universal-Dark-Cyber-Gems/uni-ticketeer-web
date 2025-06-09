import { createContext, useContext } from "react";
import useEvents from "../hooks/useEvents";

const EventContext =  createContext(null)

export function EventProvider({children}){
    let { events, eventsLoading, eventsStatus, editEvent, createEvent, getSingleEvent } = useEvents()
    return(
        <EventContext.Provider value={{
            events,
            eventsLoading,
            eventsStatus,
            editEvent,
            createEvent,
            getSingleEvent
        }}>
            {children}
        </EventContext.Provider>
    )
}

export function useEventProvider(){
    return useContext(EventContext)
}