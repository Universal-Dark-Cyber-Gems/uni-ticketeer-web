function formatTime(time24){
    let time24Split = time24?.split(":")
    let time12;

    if(parseInt(time24Split[0]) > 23 ) throw new Error("Invalid 24 hour time format");

    if(parseInt(time24Split[0]) % 12 > 0){
        let mod = parseInt(time24Split[0]) % 12
        time12 = mod + ":" + time24Split[1] + "pm"
    }else{
        time12 = time24Split[0] + ":" + time24Split[1] + "am"
    }
    
    return time12
}

export { formatTime }