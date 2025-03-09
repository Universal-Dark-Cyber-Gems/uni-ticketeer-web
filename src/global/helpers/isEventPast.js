function isEventPast(eventDateString, eventTimeString){
    let today = new Date()
    let eventDate = new Date(eventDateString)
    let currentTime = new Date().getTime().toLocaleString()
    let eventTime = eventTimeString

    console.log("current time", currentTime, "eventTime", eventTime)

    if(today > eventDate) return true
    if(currentTime > eventTime) return true

    return false
}


export { isEventPast }