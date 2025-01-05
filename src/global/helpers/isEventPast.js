function isEventPast(eventDateString){
    let today = new Date()
    let eventDate = new Date(eventDateString)

    return today > eventDate
}

export { isEventPast }