export function getCategoryString(categoryArr){
    let string = ""
    for(let i=0; i < categoryArr?.length; i++){
        string = string + " " + categoryArr[i]+","
    }

    return string
}