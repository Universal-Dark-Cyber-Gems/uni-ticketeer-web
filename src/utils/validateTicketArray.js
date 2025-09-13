function validateTicketArray(array){
    for(let i=0; i<array.length; i++){
        if(!array[i].ticket_type || array[i].ticket_type == "") return { error: true, message: "ticket name cannot be empty", index: i}
        if(!array[i].ticket_price || array[i].ticket_price == "") return { error: true, message: "ticket price cannot be empty", index: i}
        if(!array[i].ticket_banner_url || array[i].ticket_price == "") return { error: true, message: "add / upload ticket image", index: i}
    };

    return { error: false, message: ""}
}

export { validateTicketArray }