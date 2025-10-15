function isEventPast(start_at){
    if(new Date() > new Date(start_at)){
        return true
    }

    return false
}


export { isEventPast }