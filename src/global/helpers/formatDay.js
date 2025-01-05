import dayjs from "dayjs"

function formatDay(dayString, formatString="DD MMM"){
    let formatedDay = dayjs(dayString).format(formatString)
    return formatedDay;
}

export { formatDay }