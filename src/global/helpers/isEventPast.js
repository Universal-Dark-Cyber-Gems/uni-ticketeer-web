function isEventPast(eventDateString, eventTimeString){
    let today = new Date()
    let eventDate = new Date(eventDateString)
    let currentHour = new Date().getHours()
    let currentMinute = new Date().getMinutes()
    let eventHour = parseInt(eventTimeString?.split(":")[0])
    let eventMinute = parseInt(eventTimeString?.split(":")[1])

    console.log("current Hour", currentHour, "currentMinute", currentMinute,  "eventHour", eventHour, "eventMinute", eventMinute)
    console.log("date current", today, "date event", eventDate)


    if(today > eventDate){
        console.log("date don pass")
        return true
    } 

    if(today === eventDate && currentHour > eventHour){
        console.log("date don pass by Hours")
        return true
    }

    if(today === eventDate && currentHour === eventHour && currentMinute > eventMinute){
        console.log("date don pass by minutes")
        return true
    }

    console.log("date never pass")
    return false
}


export { isEventPast }